import socket
import threading
import mysql.connector
import bcrypt
import re

# Database connection
db = mysql.connector.connect(
    host="your-rds-endpoint",
    user="your-db-username",
    password="your-db-password",
    database="your-database-name"
)

cursor = db.cursor()

# Create a socket server
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('0.0.0.0', 8080))
server.listen(5)

print("Server is listening on port 8080")

# Function to handle client connections
def handle_client(client_socket):
    request = client_socket.recv(1024)
    
    # Parse the HTTP request
    request_str = request.decode('utf-8')
    request_lines = request_str.split('\r\n')

    # Extract the HTTP method and path
    method, path, _ = request_lines[0].split(' ')

    # Check if it's a POST request to the /login path
    if method == 'POST' and re.match(r'^/login', path):
        # Parse the POST data (assuming it's in a simple format like query parameters)
        post_data = request_lines[-1]
        username, password = None, None
        for param in post_data.split('&'):
            key, value = param.split('=')
            if key == 'username':
                username = value
            elif key == 'password':
                password = value
        
        if username and password:
            # Query the database to retrieve the user's hashed password
            cursor.execute("SELECT username, password FROM users WHERE username = %s", (username,))
            user = cursor.fetchone()

            if user:
                stored_username, stored_hashed_password = user
                # Verify the password using bcrypt
                if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
                    response = "HTTP/1.1 200 OK\r\n\r\nLogin successful"
                else:
                    response = "HTTP/1.1 401 Unauthorized\r\n\r\nInvalid credentials"
            else:
                response = "HTTP/1.1 401 Unauthorized\r\n\r\nInvalid credentials"
        else:
            response = "HTTP/1.1 400 Bad Request\r\n\r\nMissing username or password"
    else:
        response = "HTTP/1.1 404 Not Found\r\n\r\nPage not found"

    # Send the HTTP response
    client_socket.send(response.encode('utf-8'))
    
    client_socket.close()

while True:
    client, addr = server.accept()
    print(f"Accepted connection from {addr[0]}:{addr[1]}")
    client_handler = threading.Thread(target=handle_client, args=(client,))
    client_handler.start()

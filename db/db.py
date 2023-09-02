import mysql.connector

# Database configuration
db_config = {
    "host": "database-1.cthnanocrrjq.us-east-2.rds.amazonaws.com",
    "user": "pumpcheckadmin",
    "password": "Yellow$64",
    "database": "database-1",
}

try:
    # Establish a database connection
    connection = mysql.connector.connect(**db_config)

    if connection.is_connected():
        print("Database connection established")

        # Execute a simple query (SELECT 1)
        cursor = connection.cursor()
        cursor.execute("SELECT 1")

        # Fetch and print the result (should be 1)
        result = cursor.fetchone()
        if result and result[0] == 1:
            print("Database connection test successful")
        else:
            print("Database connection test failed")

        # Close the cursor and connection
        cursor.close()
        connection.close()
        print("Database connection closed")
except mysql.connector.Error as err:
    print(f"Error: {err}")

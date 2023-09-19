import requests

# Update these variables with your API endpoint and test data
base_url = 'http://127.0.0.1:5000'  # Replace with your actual server address
register_url = f'{base_url}/api/register'
login_url = f'{base_url}/api/login'
logout_url = f'{base_url}/api/logout'

# Test API registration
register_data = {
    'username': 'testuser',
    'password': 'testpassword'
}
response = requests.post(register_url, json=register_data)
print("Register Response:", response.json())


# Test API login
login_data = {
    'username': 'testuser',
    'password': 'testpassword'
}
response = requests.post(login_url, json=login_data)
print("Login Response:", response.json())

# Test API logout (assuming you are already logged in)
response = requests.get(logout_url)
print("Logout Response:", response.json())

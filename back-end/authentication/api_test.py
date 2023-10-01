import requests
import sys

# Update these variables with your API endpoint and test data
base_url = 'http://127.0.0.1:5000'  # Replace with your actual server address
register_url = f'{base_url}/api/register'
log_exercise_url = f'{base_url}/api/exercises'
login_url = f'{base_url}/api/login'
logout_url = f'{base_url}/api/logout'


def test_register(username):
    # Test API registration
    register_data = {
        'username': username,
        'password': 'testpassword',
        'weight': '85',
        'height': '255',
        'age': '25'
    }
    response = requests.post(register_url, json=register_data)
    print("Register Response:", response.json())
    


def test_exercise():
    log_exercise_data = {
        'exercise_name': 'bench',
        'number_of_reps': '300',
        'weight': '30'
    }

    response = requests.post(log_exercise_url, json=log_exercise_data)
    print("Log exercise response", response.json())


def test_login(user, password):

    # Test API login
    login_data = {
        'username': user,
        'password': password
    }
    response = requests.post(login_url, json=login_data)
    print("Login Response:", response.json())

    # Test API logout (assuming you are already logged in)
    response = requests.get(logout_url)
    print("Logout Response:", response.json())

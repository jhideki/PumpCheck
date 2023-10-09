import requests
import sys

# Update these variables with your API endpoint and test data
base_url = 'http://127.0.0.1:5000'  # Replace with your actual server address
register_url = f'{base_url}/auth/api/register'
log_exercise_url = f'{base_url}/auth/api/workouts'
login_url = f'{base_url}/auth/api/login'
logout_url = f'{base_url}/auth/api/logout'


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

def test_workout():
    log_workout_data = {
        'date': '2023-10-06',
        'time': '15:30',
    }


def test_login(username, password):
    # Test API login
    login_data = {
        'username': username,
        'password': password
    }
    response = requests.post(login_url, json=login_data)
    login_response = response.json()
    print("Login Response:", login_response)
    print("Login Response Status Code:", response.status_code)
    print("Login Response Content:", response.text)

    if 'access_token' in login_response:
        # Store the JWT token for future requests
        jwt_token = login_response['access_token']

        # Make an authenticated request using the JWT token
        headers = {'Authorization': f'Bearer {jwt_token}'}
        print('headers:' f'{headers}')
        '''
        

        # Example: Make a GET request to a protected endpoint
        protected_endpoint_url = f'{base_url}/api/protected'
        protected_response = requests.get(protected_endpoint_url, headers=headers)
        print("Protected Endpoint Response:", protected_response.json())
        '''
    else:
        print("No JWT token in the login response")

    # Test API logout (assuming you are already logged in)
    response = requests.get(logout_url, headers=headers)
    print("Logout Response:", response.json())

if __name__ == "__main__":
    test_login('1234','testpassword')

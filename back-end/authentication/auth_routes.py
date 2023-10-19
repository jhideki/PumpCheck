# auth_routes.py
from flask import Blueprint, request, jsonify, url_for, session
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from models import User
from extensions import db, oauth, bcrypt
from dotenv import load_dotenv
import os

env_file_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(env_file_path)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

auth_blueprint = Blueprint('auth', __name__)

# Configure OAuth for Google
google = oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    refresh_token_url=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    client_kwargs={'scope': 'email'},
)

@auth_blueprint.route('/api/register', methods=['POST'])
def api_register():
    if request.method == 'POST' and request.is_json:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        weight = data.get('weight')
        height = data.get('height')
        age = data.get('age')

        if username and password:
            hashed_password = bcrypt.generate_password_hash(password)
            new_user = User(username=username, password=hashed_password, weight=weight,height=height,age=age)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': 'User registered successfully'})
        else:
            return jsonify({'error': 'Invalid data'})

@auth_blueprint.route('/api/login', methods=['POST'])
def api_login():
    if request.method == 'POST' and request.is_json:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = User.query.filter_by(username=username).first()
            if user and bcrypt.check_password_hash(user.password, password):
                additional_claims = {
                    'user_id': user.user_id,
                }
                access_token = create_access_token(identity=user.user_id, additional_claims=additional_claims)
                return jsonify({'access_token': access_token, 'message': 'Login successful'})
            else:
                return jsonify({'error': 'Invalid username or password'})
        else:
            return jsonify({'error': 'Invalid data'})

@auth_blueprint.route('/api/logout', methods=['GET'])
@jwt_required()
def api_logout():
    current_user_id = get_jwt_identity()
    return jsonify({'message': 'Logout successful for user with ID: ' + str(current_user_id)})

@auth_blueprint.route('/api/google_login', methods=['GET'])
def api_google_login():
    redirect_uri = url_for('auth.google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)

@auth_blueprint.route('/api/google_register', methods=['post'])
def api_google_register():
    if request.method == 'POST' and request.is_json:
        data = request.get_json()
        username = data.get('username')
        weight = data.get('weight')
        height = data.get('height')
        age = data.get('age')
    
    # Check the session for the Google email
    google_email = session.get('google_user_email')
    if not google_email:
        return jsonify({'error': 'Google email not found in session'}), 400

    # Query the database for a user with the given email
    user = User.query.filter_by(email=google_email).first()

    # If a user exists, update their record with the new data
    if user:
        user.username = username
        user.weight = weight
        user.height = height
        user.age = age
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200

    # If user doesn't exist (this is an additional step, and might not be necessary for your flow)
    else:
        new_user = User(username=username, email=google_email, weight=weight, height=height, age=age)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201

@auth_blueprint.route('/google-callback')
def google_callback():
    authorization_code = request.args.get('code')

    if not authorization_code:
        return 'Authorization code not found', 400

    # Use authlib to exchange the code for a token
    token = google.authorize_access_token()

    # Save the token for future use (e.g., in a session or database)
    session['token'] = token
    resp = google.get('userinfo')

    if not resp:
        print("No response from userinfo endpoint.")
        return 'No response received.'

    user_info = resp.json()
    if 'error' in user_info:
        return 'Access denied: reason={} error={}'.format(
            user_info.get('error', "Unknown"),
            user_info.get('error_description', "Unknown")
        )

    session['google_user_email'] = user_info.get('email')

    #Register User
    if not User.query.filter_by(email=user_info['email']).first():
        new_user = User(email=user_info['email'],username=user_info['email'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Google user registered successfully'})
    else:
        #Sign in
        google_email = session.get('google_user_email')
        user = User.query.filter_by(email=google_email).first()
        additional_claims = {
                    'user_id': user.user_id,
        }
        access_token = create_access_token(identity=user.user_id, additional_claims=additional_claims)
        return jsonify({'access_token': access_token, 'message': 'Login successful'})
        


    
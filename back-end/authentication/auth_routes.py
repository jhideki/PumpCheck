# auth_routes.py
from flask import Blueprint, request, jsonify, url_for, session
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from models import User
from database import db
from flask_oauthlib.client import OAuth
from dotenv import load_dotenv
import os

env_file_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(env_file_path)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

auth_blueprint = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# Configure OAuth for Google
oauth = OAuth()
google = oauth.remote_app(
    'google',
    consumer_key=GOOGLE_CLIENT_ID,
    consumer_secret=GOOGLE_CLIENT_SECRET,
    request_token_params={
        'scope': 'email',  # Define the required scope(s)
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
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

@auth_blueprint.route('/api/google_login', methods=['POST'])
def api_google_login():
  return google.authorize(callback=url_for('auth.google_callback', _external=True))

@auth_blueprint.route('/api/google_login', methods=['POST'])
def api_google_register():
  if request.method == 'POST' and request.is_json:
    data = request.get_json()
    username = data.get('username')
    weight = data.get('weight')
    height = data.get('height')
    age = data.get('age')
  
  google.authorize(callback=url_for('auth.google_callback', _external=True))
  user_email=session.get['google_user_email']

  if not User.query.filter_by(email=user_email).first():
    new_user = User(username=username, email=user_email, weight=weight,height=height,age=age)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Google user registered successfully'})

@auth_blueprint.route('/google-callback')
def google_callback():
    resp = google.authorized_response()
    if resp is None or resp.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    
    # Fetch user email information from Google
    user_info = google.get('userinfo')
    session['google_user_email'] = user_info.data['email']
    
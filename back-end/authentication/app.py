from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from routes import routes
from models import User
from flask_jwt_extended import JWTManager
from database import db

from dotenv import load_dotenv
import os

env_file_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(env_file_path)

DB_USER = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("HOST_ENDPOINT")
DB_NAME = os.getenv("DB_NAME")
SECRET_KEY = os.getenv("SECRET_KEY")

app = Flask(__name__)

bcrypt = Bcrypt(app)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SECRET_KEY'] = SECRET_KEY

db.init_app(app)
jwt = JWTManager(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

Routes = routes(app,db)
Routes.configure_routes()

if __name__ == '__main__':
    app.run(debug=True)
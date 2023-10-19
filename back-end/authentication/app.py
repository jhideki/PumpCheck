from flask import Flask
from flask_cors import CORS
from extensions import db,jwt,oauth,bcrypt
from auth_routes import auth_blueprint
from workouts_routes import workouts_blueprint

from dotenv import load_dotenv
import os

env_file_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(env_file_path)

DB_USER = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("HOST_ENDPOINT")
DB_NAME = os.getenv("DB_NAME")
SECRET_KEY = os.getenv("SECRET_KEY")

def create_app():
    
    app = Flask(__name__)
    oauth.init_app(app)
    bcrypt.init_app(app)
    CORS(app)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
    app.config['SECRET_KEY'] = SECRET_KEY

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(workouts_blueprint, url_prefix='/workouts')
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
from flask import request, jsonify
from flask_login import login_user, logout_user
from flask_bcrypt import Bcrypt

class routes:
    def __init__(self, app, db, User):
        self.app = app
        self.db = db
        self.User = User

    def configure_routes(self):
        app = self.app
        db = self.db
        User = self.User

        bcrypt = Bcrypt(app)

        @app.route('/api/register', methods=['POST'])
        def api_register():
            if request.method == 'POST' and request.is_json:
                data = request.get_json()
                username = data.get('username')
                password = data.get('password')

                if username and password:
                    hashed_password = bcrypt.generate_password_hash(password)
                    new_user = User(username=username, password=hashed_password)
                    db.session.add(new_user)
                    db.session.commit()
                    return jsonify({'message': 'User registered successfully'})
                else:
                    return jsonify({'error': 'Invalid data'})

        @app.route('/api/login', methods=['POST'])
        def api_login():
            if request.method == 'POST' and request.is_json:
                data = request.get_json()
                username = data.get('username')
                password = data.get('password')

                if username and password:
                    user = User.query.filter_by(username=username).first()
                    if user and bcrypt.check_password_hash(user.password, password):
                        login_user(user)
                        return jsonify({'message': 'Login successful'})
                    else:
                        return jsonify({'error': 'Invalid username or password'})
                else:
                    return jsonify({'error': 'Invalid data'})

        @app.route('/api/logout', methods=['GET'])
        def api_logout():
            logout_user()
            return jsonify({'message': 'Logout successful'})

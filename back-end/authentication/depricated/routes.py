from flask import request, jsonify, redirect, url_for
from flask_login import login_user, logout_user
from flask_bcrypt import Bcrypt
from models import Workout, Exercise, User
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

class routes:
    def __init__(self, app, db):
        self.app = app
        self.db = db

    def configure_routes(self):
        app = self.app
        db = self.db

        bcrypt = Bcrypt(app)

        @app.route('/api/register', methods=['POST'])
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

        @app.route('/api/login', methods=['POST'])
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

        @app.route('/api/logout', methods=['GET'])
        @jwt_required()
        def api_logout():
            current_user_id = get_jwt_identity()
            return jsonify({'message': 'Logout successful for user with ID: ' + str(current_user_id)})
        
        @app.route('/api/workouts', methods=['GET'])
        def get_workouts():
            # Retrieve all workouts
            workouts = Workout.query.all()
            return jsonify([workout.serialize() for workout in workouts])

        @app.route('/api/workouts', methods=['POST'])
        def create_workout():
            data = request.json
            user_id = data['user_id']
            date = data['date']
            time = data.get('time')

            workout = Workout(user_id=user_id, date=date, time=time)
            db.session.add(workout)
            db.session.commit()
            return jsonify({'message': 'Workout created successfully'})

        @app.route('/api/exercises', methods=['GET'])
        def get_exercises():
            # Retrieve all exercises
            exercises = Exercise.query.all()
            return jsonify([exercise.serialize() for exercise in exercises])

        @app.route('/api/exercises', methods=['POST'])
        def create_exercise():
            data = request.json
            workout_id = data['workout_id']
            exercise_name = data['exercise_name']
            number_of_reps = data.get('number_of_reps')
            weight = data.get('weight')

            exercise = Exercise(workout_id=workout_id, exercise_name=exercise_name, number_of_reps=number_of_reps, weight=weight)
            db.session.add(exercise)
            db.session.commit()
            return jsonify({'message': 'Exercise created successfully'})
        

        
        @app.route('/api/protected', methods=['GET'])
        def protected_resource():
            # Check if the 'Authorization' header is present in the request
            if 'Authorization' not in request.headers:
                return 'Missing Authorization header', 401  # Unauthorized

            # Get the value of the 'Authorization' header
            auth_header = request.headers['Authorization']

            # Split the header value to get the token
            # Assuming that the header value format is "Bearer YOUR_ACCESS_TOKEN"
            parts = auth_header.split()
            if len(parts) != 2 or parts[0] != 'Bearer':
                return 'Invalid Authorization header format', 401  # Unauthorized

            access_token = parts[1]

            # Now you have the access_token, and you can validate it and perform any necessary actions

            return 'Protected resource accessed successfully'
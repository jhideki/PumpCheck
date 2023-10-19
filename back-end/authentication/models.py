from extensions import db

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)
    height = db.Column(db.Float)
    email = db.Column(db.String(255))

    def get_id(self):
        return str(self.user_id)

    def serialize(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'age': self.age,
            'weight': self.weight,
            'height': self.height,
            'email': self.email,
        }

class Workout(db.Model):
    __tablename__ = 'workouts'

    workout_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time)

    # Define a relationship with the User model
    user = db.relationship('User', backref='workouts')

    def serialize(self):
        return {
            'workout_id': self.workout_id,
            'user_id': self.user_id,
            'date': str(self.date),
            'time': str(self.time)
        }

class Exercise(db.Model):
    __tablename__ = 'exercises'

    exercise_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.workout_id'), nullable=False)
    exercise_name = db.Column(db.String(255), nullable=False)
    number_of_reps = db.Column(db.Integer)
    weight = db.Column(db.Float)

    # Define a relationship with the Workout model
    workout = db.relationship('Workout', backref='exercises')

    def serialize(self):
        return {
            'exercise_id': self.exercise_id,
            'workout_id': self.workout_id,
            'exercise_name': self.exercise_name,
            'number_of_reps': self.number_of_reps,
            'weight': self.weight
        }

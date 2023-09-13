CREATE DATABASE IF NOT EXISTS pumpcheck_db;

USE pumpcheck_db;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- You should hash and salt passwords for security
    height FLOAT,
    weight FLOAT,
    age INT
);

CREATE TABLE IF NOT EXISTS workouts (
    workout_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS exercises (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    exercise_name VARCHAR(255) NOT NULL,
    number_of_reps INT,
    weight FLOAT,
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id)
);

show tables;
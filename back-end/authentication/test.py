import pymysql
from dotenv import load_dotenv
import os

env_file_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(env_file_path)

# Replace these variables with your actual database configuration
db_user = 'your_db_user'
db_password = 'your_db_password'
db_host = 'your_db_host'
db_name = 'pumpcheck-db'

db_user = os.getenv("DB_USERNAME")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("HOST_ENDPOINT")
db_name = os.getenv("DB_NAME")

try:
    conn = pymysql.connect(
        user=db_user, password=db_password, host=db_host, database=db_name)
    conn.close()
    print("Database connection successful")
except Exception as e:
    print(f"Database connection failed: {str(e)}")
import subprocess
import time

PG_DATA_DIR = "C:\\Program Files\\PostgreSQL\\17\\data"

def start_postgres():
    print("Starting PostgreSQL..")
    subprocess.run(['pg_ctl', 'start', '-D', PG_DATA_DIR], check=True)
    time.sleep(5) 

def start_fastapi():
    print("Starting FastAPI...")
    subprocess.run(['uvicorn', 'main:app', '--reload'], check=True)

if __name__ == "__main__":
    try:
        start_postgres()
        start_fastapi()
    except Exception as e:
        print(f"There was an error: {e}")

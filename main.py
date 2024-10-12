from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.base import Base
from api.rosco import router as rosco_router
from api.etl import router as etl_router

DATABASE_URL = "postgresql://postgres:root@localhost/db?client_encoding=utf8"

# DB engine
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

# create db tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(rosco_router, prefix="/roscos", tags=["Roscos"])
app.include_router(etl_router, prefix="/etl", tags=["ETL"])

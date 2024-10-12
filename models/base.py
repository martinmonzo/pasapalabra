from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import declarative_base, sessionmaker

from config import DATABASE_URL


engine = create_engine(DATABASE_URL)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

metadata = MetaData()
Base = declarative_base(metadata=metadata)


def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

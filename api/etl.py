from fastapi import APIRouter

from service.etl import save_to_db

router = APIRouter()


@router.post("/")
def save_data_to_db():
    return save_to_db()

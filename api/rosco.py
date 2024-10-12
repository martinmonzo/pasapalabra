from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from models.base import get_db
from service.generar_roscos import RoscoService
from schema.input.rosco import CreateTieBreakRoscosInput

router = APIRouter()


@router.post("/tie-break")
def generate_tie_break_roscos(
    session: Session = Depends(get_db),
    input: CreateTieBreakRoscosInput = Body(),
) -> dict:
    return RoscoService(session).generate_roscos_tie_break(**input.model_dump())

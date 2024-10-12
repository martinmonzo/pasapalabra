from pydantic import Field
from schema.base import CamelModel


class CreateTieBreakRoscosInput(CamelModel):
    words_per_rosco: int = Field(25, description="Words per rosco", ge=1, le=25, examples=[12, 25])
    pairs: int = Field(1, description="Pairs of roscos to create", ge=1, examples=[1, 10])


class CreateRoscosInput(CreateTieBreakRoscosInput):
    pairs: int = Field(1, description="Pairs of roscos to create", ge=1, examples=[1, 10])

from models.base import Base
from sqlalchemy import Column, Integer, String


class Definicion(Base):
    __tablename__ = 'definiciones'

    id = Column(Integer, primary_key=True, index=True)
    acepcion = Column(String, nullable=False)
    respuesta = Column(String, nullable=False)
    categoria_palabra = Column(String, nullable=False)
    tambien_valen = Column(String)
    no_valen = Column(String)
    aciertos_testers = Column(Integer, nullable=False, default=0)

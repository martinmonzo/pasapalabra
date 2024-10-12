from datetime import datetime
import random
import shutil
import openpyxl
from sqlalchemy import and_, or_

from models.definicion import Definicion
from starlette import status
from constants import EXCEL_CELLS, LETTERS, LETTERS_CONTAINS, VOWELS


class RoscoService:
    def __init__(self, session):
        self.session = session
        self.aceptions = set()
        self.answers = set()

    def generate_roscos_tie_break(self, words_per_rosco: int) -> None:
        print("Generando roscos...")
        # Ruta del archivo original
        ruta_origen = 'Plantilla penales.xlsx'
        definiciones = self.session.query(Definicion).filter(
            and_(
                Definicion.aciertos_testers < 4,
                or_(
                    Definicion.categoria_palabra != "Enciclopédica",
                    Definicion.categoria_palabra.is_(None),
                )
            )
        ).all()

        now = datetime.now().strftime("%d-%m-%Y_%H-%M-%S") 
        ruta_destino = f'roscos/penales/roscos_penales_{now} {i}.xlsx'
        shutil.copy2(ruta_origen, ruta_destino)
        workbook = openpyxl.load_workbook(ruta_destino)

        definitions_by_right_answers = self._generate_definitions_by_right_answers(definiciones)

        letters = LETTERS.copy()
        for _ in range(words_per_rosco):
            random_letter = random.choice(letters)
            letters.remove(random_letter)
            
            random_definitions = self._get_random_definitions(definitions_by_right_answers, random_letter)

            row = EXCEL_CELLS["rows"][random_letter]

            for sheet_number in range(2):
                sheet = workbook[str(sheet_number + 1)]
                definition = random_definitions[sheet_number]

                self.aceptions.add(definition.acepcion)
                self.answers.add(definition.respuesta)

                sheet[f"C{row}"] = definition.acepcion
                sheet[f"D{row}"] = definition.respuesta
                sheet[f"E{row}"] = definition.categoria_palabra
                sheet[f"F{row}"] = definition.tambien_valen
                sheet[f"G{row}"] = definition.no_valen
                sheet[f"Y{row}"] = definition.aciertos_testers

        workbook.save(ruta_destino)
        return {"status": status.HTTP_200_OK, "msg": "ok"}

    def _generate_definitions_by_right_answers(self, definitions: list) -> dict:
        definitions_by_right_answers = {}
        for definition in definitions:
            key = definition.aciertos_testers
            if key not in definitions_by_right_answers:
                definitions_by_right_answers[key] = []
            definitions_by_right_answers[key].append(definition)
        
        return definitions_by_right_answers

    def _get_random_definitions(self, definitions_by_right_answers, letter):
        keys = list(definitions_by_right_answers.keys())
        # Choose a key randomly
        random_key = random.choice(keys)

        if letter == "U":
            filtered_definitions = [
                definition for definition in definitions_by_right_answers[random_key]
                if any(vowel in definition.respuesta.upper() for vowel in VOWELS[letter])
            ]
        elif letter in VOWELS:
            filtered_definitions = [
                definition for definition in definitions_by_right_answers[random_key]
                if any(definition.respuesta.upper().startswith(vowel) for vowel in VOWELS[letter])
            ]

        elif letter in LETTERS_CONTAINS:
            filtered_definitions = [
                definition for definition in definitions_by_right_answers[random_key]
                if letter in definition.respuesta.upper()
            ]
        else:
            filtered_definitions = [
                definition for definition in definitions_by_right_answers[random_key]
                if definition.respuesta.upper().startswith(letter)
            ]

        # Avoid repeating definitions or answers
        filtered_definitions = [
            definition for definition in filtered_definitions
            if definition.acepcion not in self.aceptions and definition.respuesta not in self.answers
        ]

        return random.sample(filtered_definitions, 2)

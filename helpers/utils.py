from constants import WORD_CATEGORIES


def get_word_category(acepcion, categoria_palabra):
    for categoria in WORD_CATEGORIES.keys():
        for comienzo_acepcion in WORD_CATEGORIES[categoria].get("comienzo_acepcion", []):
            if acepcion.startswith(comienzo_acepcion):
                return categoria

        for escritura_erronea in WORD_CATEGORIES[categoria].get("escritura_erronea"):
            if categoria_palabra == escritura_erronea:
                return categoria

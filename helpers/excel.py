def get_rows_rosco(sheet):
    # Iterar sobre las celdas de la columna 1 (A)
    for fila in range(1, sheet.max_row + 1):
        celda = sheet.cell(row=fila, column=1)  # Columna 1 (A)
        if celda.value == "A":  # Comprobar si el valor coincide
            return [i for i in range(fila, fila + 25)]


def there_are_columns_also_valid_and_not_valid(sheet, fila):
    celda_tambien_valen = sheet.cell(row=fila, column=6)
    celda_no_valen = sheet.cell(row=fila, column=7)
    
    return celda_tambien_valen.value == "También valen" and celda_no_valen.value == "NO valen"


def get_test_cells(sheet):
    for col in range(20, sheet.max_column + 1):  # Comienza en la columna 20 (T)
        for row in range(1, 4):  # Itera las filas 1 a 3
            cell_value = sheet.cell(row=row, column=col).value
            if cell_value == "SUMA":
                return {
                    "columna": col,
                    "filas": [i for i in range(row+1, row+26)],
                }

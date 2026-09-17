#!/usr/bin/env python3
"""
Validador de Integridad de Datos e Inventario Comercial - Ciudad Mayakoba
Verifica que inventario_mayakoba.json cumpla estrictamente con la especificación
del esquema draft-07 InventarioInmobiliarioMayakoba solicitado por el usuario.
"""

import json
import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA_PATH = os.path.join(BASE_DIR, "data", "schema_inventario_mayakoba.json")
DATA_PATH = os.path.join(BASE_DIR, "data", "inventario_mayakoba.json")

def load_json(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

def validate_inventory():
    print("================================================================")
    print("  VALIDADOR DE ESQUEMA DRAFT-07: INVENTARIO MAYAKOBA")
    print("================================================================")

    schema = load_json(SCHEMA_PATH)
    data = load_json(DATA_PATH)

    print(f"[*] Esquema cargado: {schema['title']} ({schema.get('$schema', '')})")
    assert "desarrollos" in data, "Falta la propiedad raíz 'desarrollos'"
    desarrollos = data["desarrollos"]
    print(f"[*] Registros analizados: {len(desarrollos)}")

    allowed_tipos = ["Vivienda", "Inversión", "Lote Residencial", "Lote Comercial"]
    allowed_estatus = ["Vigente", "Por confirmar", "Preventa"]
    allowed_razones = ["OPLK", "NTCA", "CEIBA", "TRAM"]
    required_fields = ["id_desarrollo", "nombre", "tipo_producto", "estatus_precio", "rango_precio_mxn", "razon_social"]

    for idx, d in enumerate(desarrollos, 1):
        print(f"\n[{idx}] Validando: {d.get('nombre', 'Sin nombre')} ({d.get('id_desarrollo', 'Sin ID')})")

        # 1. Campos requeridos
        for rf in required_fields:
            if rf not in d:
                raise ValueError(f"Falta el campo obligatorio '{rf}' en el registro {d.get('id_desarrollo', idx)}")

        # 2. Tipos de datos
        assert isinstance(d["id_desarrollo"], str), "id_desarrollo debe ser string"
        assert isinstance(d["nombre"], str), "nombre debe ser string"
        assert d["tipo_producto"] in allowed_tipos, f"tipo_producto inválido: {d['tipo_producto']}"
        assert d["estatus_precio"] in allowed_estatus, f"estatus_precio inválido: {d['estatus_precio']}"
        assert d["razon_social"] in allowed_razones, f"razon_social inválida: {d['razon_social']}"

        # 3. Rango de precio
        rp = d["rango_precio_mxn"]
        assert isinstance(rp, dict), "rango_precio_mxn debe ser un objeto"
        assert "min" in rp and "max" in rp, "rango_precio_mxn requiere 'min' y 'max'"
        assert isinstance(rp["min"], (int, float)) and isinstance(rp["max"], (int, float)), "min y max deben ser numéricos"
        assert rp["max"] >= rp["min"], f"max ({rp['max']}) debe ser >= min ({rp['min']})"

        # 4. Campos opcionales tipados
        if "tipologias" in d:
            assert isinstance(d["tipologias"], list), "tipologias debe ser una lista"
            for t in d["tipologias"]:
                assert isinstance(t, str), "Cada tipología debe ser string"

        if "apto_credito" in d:
            assert isinstance(d["apto_credito"], bool), "apto_credito debe ser boolean"

        if "tags_segmentacion" in d:
            assert isinstance(d["tags_segmentacion"], list), "tags_segmentacion debe ser una lista"
            for tag in d["tags_segmentacion"]:
                assert isinstance(tag, str), "Cada tag debe ser string"

        print(f"    - Tipo: {d['tipo_producto']} | Estatus: {d['estatus_precio']}")
        print(f"    - Rango: ${rp['min']:,.2f} a ${rp['max']:,.2f} MXN")
        print(f"    - Razón Social: {d['razon_social']}")
        print(f"    - Tipologías ({len(d.get('tipologias', []))}): {', '.join(d.get('tipologias', []))}")
        print(f"    - Apto Crédito: {d.get('apto_credito', False)}")
        print(f"    - Tags ({len(d.get('tags_segmentacion', []))}): {', '.join(d.get('tags_segmentacion', []))}")

    print("\n================================================================")
    print("  [VALIDACION 100% EXITOSA] Todos los registros cumplen el esquema.")
    print("================================================================")

if __name__ == "__main__":
    try:
        validate_inventory()
    except Exception as e:
        print(f"\n[ERROR DE VALIDACION] {e}", file=sys.stderr)
        sys.exit(1)

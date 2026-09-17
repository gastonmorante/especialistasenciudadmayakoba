#!/usr/bin/env python3
"""
Servidor Simulador de Webhook Inbound de GoHighLevel (GHL)
Recibe, valida y depura los envíos del Quiz comercial de Ciudad Mayakoba.
Maneja CORS preflight para permitir pruebas directas desde el navegador local.
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import sys

HOST = "localhost"
PORT = 8080

class GHLWebhookHandler(BaseHTTPRequestHandler):

    def _set_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS, GET")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept")

    def do_OPTIONS(self):
        """Manejo de CORS preflight requests desde el frontend"""
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        """Endpoint de salud"""
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self._set_cors_headers()
        self.end_headers()
        resp = {
            "status": "online",
            "service": "Simulador Webhook GoHighLevel - Especialista Ciudad Mayakoba",
            "endpoint": f"http://{HOST}:{PORT}/api/ghl-webhook"
        }
        self.wfile.write(json.dumps(resp, indent=2).encode("utf-8"))

    def do_POST(self):
        """Recepción y validación de leads del Quiz"""
        if self.path != "/api/ghl-webhook":
            self.send_response(404)
            self.send_header("Content-Type", "application/json")
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(b'{"error": "Endpoint no encontrado. Use /api/ghl-webhook"}')
            return

        content_length = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_length)

        try:
            payload = json.loads(post_body.decode("utf-8"))
        except Exception as e:
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"error": f"JSON invalido: {str(e)}"}).encode("utf-8"))
            return

        # Validaciones de campos requeridos por GoHighLevel
        custom_fields = payload.get("customFields", {})
        required_cf = [
            "cm_tipo_interes",
            "cm_desarrollo_preferido",
            "cm_rango_presupuesto",
            "cm_plazo_compra"
        ]

        missing_cf = [cf for cf in required_cf if cf not in custom_fields]

        first_name = payload.get('first_name') or payload.get('firstName') or ''
        last_name = payload.get('last_name') or payload.get('lastName') or ''
        full_name = payload.get('name') or f"{first_name} {last_name}".strip()

        # Configurar salida segura para Windows
        print("\n=======================================================")
        print("  [WEBHOOK RECIBIDO] Entrada desde Quiz Ciudad Mayakoba")
        print("=======================================================")
        print(f"  Contacto: {full_name}")
        print(f"  Email:    {payload.get('email', '')}")
        print(f"  Telefono: {payload.get('phone', '')}")
        print(f"  Tags:     {', '.join(payload.get('tags', []))}")
        print("-------------------------------------------------------")
        print("  Custom Fields de Calificacion (GHL):")
        for cf in required_cf:
            val = custom_fields.get(cf, "NO PROPORCIONADO")
            status = "OK" if cf in custom_fields else "FALTANTE"
            print(f"  [{status}] {cf}: {val}")

        if "cm_objetivo" in custom_fields:
            print(f"  [OK] cm_objetivo: {custom_fields['cm_objetivo']}")

        metadata = payload.get("metadata", {})
        print("-------------------------------------------------------")
        print(f"  Desarrollo Match: {custom_fields.get('cm_desarrollo_preferido', metadata.get('desarrollo_nombre_match', 'N/A'))}")
        if metadata:
            print(f"  Razon Social:     {metadata.get('razon_social_asociada', 'N/A')}")
            print(f"  Rango Precio:     {metadata.get('precio_referencia', 'N/A')}")
        print("=======================================================\n")

        if missing_cf:
            self.send_response(422)
            self.send_header("Content-Type", "application/json")
            self._set_cors_headers()
            self.end_headers()
            err_resp = {
                "status": "error",
                "message": "Faltan Custom Fields requeridos de Ciudad Mayakoba",
                "missing_fields": missing_cf
            }
            self.wfile.write(json.dumps(err_resp).encode("utf-8"))
            return

        # Respuesta exitosa simulando GoHighLevel
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self._set_cors_headers()
        self.end_headers()

        success_response = {
            "status": "success",
            "message": "Lead procesado correctamente en GoHighLevel",
            "ghl_contact_id": f"ghl_sim_{abs(hash(payload.get('email', '')))}",
            "pipeline_assigned": "Ventas Mayakoba 2026",
            "stage_assigned": "Nuevo Prospecto - Mayakoba",
            "tags_assigned": payload.get("tags", []),
            "advisor_alert_sent": True,
            "brochure_delivery_queued": True
        }
        self.wfile.write(json.dumps(success_response, indent=2).encode("utf-8"))

def run_server():
    server_address = (HOST, PORT)
    httpd = HTTPServer(server_address, GHLWebhookHandler)
    print(f"[*] Servidor Simulador de Webhook GHL activo en http://{HOST}:{PORT}")
    print(f"[*] Endpoint listo para recibir POST: http://{HOST}:{PORT}/api/ghl-webhook")
    print("[*] Presione Ctrl+C para detener el servidor.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[*] Servidor detenido ordenadamente.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()

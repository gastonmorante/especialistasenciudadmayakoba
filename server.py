#!/usr/bin/env python3
"""
Servidor Unificado de Producción para Render.com
Ecosistema Comercial "Especialista en Ciudad Mayakoba"

- Sirve el Frontend (HTML5, Tailwind, JS, CSS)
- Sirve todos los activos multimedia (176 imágenes y 11 PDFs legales)
- Procesa el endpoint Webhook /api/ghl-webhook para GoHighLevel
- Compatible con la variable de entorno PORT asignada por Render.com
"""

import os
import sys
import json
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT", 8080))
HOST = "0.0.0.0"

class MayakobaUnifiedHandler(SimpleHTTPRequestHandler):

    def _set_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept")

    def do_OPTIONS(self):
        """Manejo de CORS preflight para llamadas al Webhook"""
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        """Servicio de archivos estáticos y rutas del ecosistema"""
        clean_path = self.path.split("?")[0]

        # 1. Ruta raíz -> Frontend principal
        if clean_path in ["/", "/index.html"]:
            self._serve_file(os.path.join(BASE_DIR, "frontend", "index.html"), "text/html; charset=utf-8")
            return

        if clean_path == "/styles.css":
            self._serve_file(os.path.join(BASE_DIR, "frontend", "styles.css"), "text/css; charset=utf-8")
            return

        if clean_path == "/app.js":
            self._serve_file(os.path.join(BASE_DIR, "frontend", "app.js"), "application/javascript; charset=utf-8")
            return

        # 2. Endpoint de salud / status
        if clean_path == "/healthz":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(b'{"status":"healthy","service":"Especialista Ciudad Mayakoba"}')
            return

        # 3. Resolver imágenes y PDFs con soporte para rutas relativas cruzadas
        search_path = clean_path.lstrip("/")
        
        # Eliminar prefijos de navegación relativa si existen en la URL
        for prefix in ["Database web anterior/", "frontend/"]:
            if search_path.startswith(prefix):
                search_path = search_path[len(prefix):]

        candidate_file = os.path.join(BASE_DIR, search_path)
        if os.path.isfile(candidate_file):
            mime_type, _ = mimetypes.guess_type(candidate_file)
            self._serve_file(candidate_file, mime_type or "application/octet-stream")
            return

        # Buscar dentro de Imagenes_Descargadas o PDFs_Legales directamente si solo viene el nombre
        for folder in ["Imagenes_Descargadas", "PDFs_Legales", "data"]:
            direct_candidate = os.path.join(BASE_DIR, folder, os.path.basename(search_path))
            if os.path.isfile(direct_candidate):
                mime_type, _ = mimetypes.guess_type(direct_candidate)
                self._serve_file(direct_candidate, mime_type or "application/octet-stream")
                return

        # 404 Not Found
        self.send_response(404)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self._set_cors_headers()
        self.end_headers()
        self.wfile.write(f"Archivo no encontrado: {clean_path}".encode("utf-8"))

    def do_POST(self):
        """Procesamiento de Webhooks GoHighLevel"""
        clean_path = self.path.split("?")[0]

        if clean_path not in ["/api/ghl-webhook", "/webhook"]:
            self.send_response(404)
            self.send_header("Content-Type", "application/json")
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(b'{"error": "Endpoint no valido. Use /api/ghl-webhook"}')
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

        first_name = payload.get("first_name") or payload.get("firstName") or ""
        last_name = payload.get("last_name") or payload.get("lastName") or ""
        full_name = payload.get("name") or f"{first_name} {last_name}".strip()
        custom_fields = payload.get("customFields", {})

        print("\n=======================================================")
        print("  [LEAD PROCESADO EN RENDER] Entrada de Webhook GHL")
        print("=======================================================")
        print(f"  Contacto: {full_name}")
        print(f"  Email:    {payload.get('email', '')}")
        print(f"  Telefono: {payload.get('phone', '')}")
        print(f"  Tags:     {', '.join(payload.get('tags', []))}")
        print("  Custom Fields:")
        for k, v in custom_fields.items():
            print(f"    - {k}: {v}")
        print("=======================================================\n")

        # Respuesta de éxito para GHL
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self._set_cors_headers()
        self.end_headers()

        response = {
            "status": "success",
            "message": "Lead recibido y procesado en servidor Render",
            "contact_name": full_name,
            "pipeline": "Ventas Mayakoba 2026",
            "stage": "Nuevo Prospecto - Mayakoba",
            "tags_assigned": payload.get("tags", []),
            "webhook_source": payload.get("source", "Web Especialista Mayakoba")
        }
        self.wfile.write(json.dumps(response, indent=2).encode("utf-8"))

    def _serve_file(self, filepath, content_type):
        try:
            with open(filepath, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(content)))
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(f"Error al leer archivo: {str(e)}".encode("utf-8"))

def main():
    server_address = (HOST, PORT)
    httpd = HTTPServer(server_address, MayakobaUnifiedHandler)
    print(f"[*] Servidor Mayakoba activo en http://{HOST}:{PORT}")
    print(f"[*] Frontend disponible en: http://{HOST}:{PORT}/")
    print(f"[*] Webhook disponible en:  http://{HOST}:{PORT}/api/ghl-webhook")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[*] Servidor detenido.")
        httpd.server_close()

if __name__ == "__main__":
    main()

"""
Plataforma de Línguas Indígenas
Sistema principal Flask
"""

import os
from flask import Flask, send_from_directory, abort

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-key-change-in-production")

# ===== SISTEMA DE APRENDIZAGEM =====
from aprendizagem.routes.plataforma import plataforma_bp

app.register_blueprint(plataforma_bp)

# ===== PORTAL ESTATICO (dist) =====
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, "dist")


def serve_dist(path: str):
    full_path = os.path.join(DIST_DIR, path)
    if os.path.isfile(full_path):
        return send_from_directory(DIST_DIR, path)
    return None


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def static_portal(path):
    file_response = serve_dist(path)
    if file_response:
        return file_response

    if path == "":
        return send_from_directory(DIST_DIR, "index.html")

    file_response = serve_dist(f"{path}.html")
    if file_response:
        return file_response

    file_response = serve_dist(os.path.join(path, "index.html"))
    if file_response:
        return file_response

    not_found = serve_dist("404.html")
    if not_found:
        return not_found, 404

    abort(404)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)

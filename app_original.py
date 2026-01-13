"""
Plataforma de Línguas Indígenas
Sistema principal Flask
"""

import os
from flask import (
    Flask,
    render_template,
    send_from_directory,
    request,
    redirect,
    url_for,
    session,
)

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-key-change-in-production")

# ===== SISTEMA DE APRENDIZAGEM =====
from aprendizagem.routes.plataforma import plataforma_bp
app.register_blueprint(plataforma_bp)

# ===== IDIOMA =====
SUPPORTED_LANGS = {"pt", "en", "es"}  # es = Espanhol (México)
DEFAULT_LANG = "pt"


def normalize_lang(lang: str) -> str:
    lang = (lang or "").lower().strip()
    return lang if lang in SUPPORTED_LANGS else DEFAULT_LANG


def get_language() -> str:
    """
    Prioridade:
    1) sessão
    2) cookie
    3) querystring (?lang=)
    4) default
    """
    lang = session.get("lang")
    if lang:
        return normalize_lang(lang)

    lang = request.cookies.get("lang")
    if lang:
        return normalize_lang(lang)

    lang = request.args.get("lang")
    if lang:
        return normalize_lang(lang)

    return DEFAULT_LANG


def set_language_and_redirect(lang: str):
    """
    Define idioma e redireciona para a página anterior (ou home).
    Salva em sessão + cookie (1 ano).
    """
    lang = normalize_lang(lang)
    session["lang"] = lang

    resp = redirect(request.referrer or url_for("index"))
    resp.set_cookie("lang", lang, max_age=31536000, samesite="Lax")
    return resp


# Compatibilidade: duas URLs para setar idioma (sem conflito)
@app.route("/lang/<lang>")
def set_language(lang):
    return set_language_and_redirect(lang)


@app.route("/set-language/<lang>")
def set_language_alt(lang):
    return set_language_and_redirect(lang)


# ===== ROTAS PRINCIPAIS =====
@app.route("/")
def index():
    return render_template("index.html", lang=get_language())


@app.route("/plataformas")
def plataformas():
    """Hub de plataformas por língua"""
    return render_template("plataformas.html", lang=get_language())


@app.route("/aprendizagem")
def aprendizagem():
    """Plataforma de aprendizagem interativa"""
    return render_template("aprendizagem.html", lang=get_language())


@app.route("/assets/<path:filename>")
def assets(filename):
    """Serve arquivos estáticos da pasta assets"""
    return send_from_directory("assets", filename)


@app.errorhandler(404)
def not_found(e):
    return render_template("404.html", lang=get_language()), 404


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)

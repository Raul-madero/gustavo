import secrets
from flask import Flask, jsonify
from flask_smorest import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS


from db import db
import models
import os
import psycopg2

from blocklist import BLOCKLIST
from resources.clients import blp as clients_blueprint
from resources.colaborador import blp as colaboradores_blueprints
from resources.user import blp as users_blueprint

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
# os.getenv("MONGODB_URL", 
    app.config["PROPAGATE_EXTENSIONS"] = True
    app.config["API_TITLE"] = "API de contabilidad"
    app.config["API_VERSION"] = "1.0.0"
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/docs"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "/docs/swagger-ui"
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("RENDER_DB_URL") or "sqlite:///gustavo_ramirez.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    migrate = Migrate(app, db)

    api = Api(app)

    # secrets.SystemRandom().getrandbits(128)

    app.config["JWT_SECRET_KEY"] = "62326431520918773712415152471275453433"
    jwt = JWTManager(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        return jwt_payload["jti"] in BLOCKLIST
    
    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback(jwt_header, jwt_payload):
        return jsonify({"message": "Token no es fresh"}), 401

    @jwt.expired_token_loader
    def expired_token_callback():
        return jsonify({"message": "Token expirado"}), 401
    
    @jwt.revoked_token_loader
    def revoke_token_callback():
        return jsonify({"message": "Token revocado"}), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({"message": "Token inválido"}), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({"message": "Falta token"}), 401

    api.register_blueprint(clients_blueprint)
    api.register_blueprint(colaboradores_blueprints)
    api.register_blueprint(users_blueprint)

    return app

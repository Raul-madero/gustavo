from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, create_refresh_token, get_jwt_identity
import requests

from blocklist import BLOCKLIST
import os
from db import db
from models import UsersModel
from schemas import UserSchema, PutUserSchema, LoginSchema

blp = Blueprint('users', __name__, description='Usuarios')

def send_simple_message(to, subject, body):
    domain = os.getenv("MAILGUN_DOMAIN")
    return requests.post(
		f"https://api.mailgun.net/v3/{domain}/messages",
		auth=("api", os.getenv("MAILGUN_API_KEY")),
		data={"from": f"Excited User <mailgun@{domain}>",
			"to": [to],
			"subject": subject,
			"text": body})

@blp.route('/usuarios', methods=["GET", "POST"])
class UsersList(MethodView):
    # @jwt_required()
    @blp.response(200, UserSchema(many=True))
    def get(self):
        users = UsersModel.query.all()
        return users, 200
    
    # @jwt_required()
    @blp.arguments(UserSchema)
    @blp.response(201, UserSchema)
    def post(self, user_data):
        user = UsersModel(
            nombre = user_data['nombre'],
            apellido = user_data['apellido'],
            email = user_data['email'],
            password = pbkdf2_sha256.hash(user_data['password']),
            verificado = user_data['verificado'],
            # client_id = user_data['client_id']
        )
        if UsersModel.query.filter_by(email=user.email).first():
            abort(400, message="Email ya registrado.")
        try:
            db.session.add(user)
            db.session.commit()
            # send_simple_message(user.email, "Registro exitoso", "Bienvenido a nuestra plataforma")
            return user, 201
        except SQLAlchemyError:
            db.session.rollback()
            abort (400, message = "Campos faltantes.") 

@blp.route('/usuarios/<int:id>', methods=["GET", "PUT", "DELETE"])
class Users(MethodView):
    # @jwt_required()
    @blp.response(200, UserSchema)
    def get(self, id):
        user = UsersModel.query.get_or_404(id)
        return user, 200
    
    # @jwt_required()
    @blp.arguments(PutUserSchema)
    @blp.response(200, PutUserSchema)
    def put(self, user_data, id):
        user = UsersModel.query.get_or_404(id)
        user.nombre = user_data['nombre']
        user.apellido = user_data['apellido']
        user.email = user_data['email']
        user.password = pbkdf2_sha256.hash(user_data['password'])
        user.verificado = user_data['verificado']
        try:
            db.session.add(user)
            db.session.commit()
            return user, 200
        except SQLAlchemyError:
            db.session.rollback()
            abort (400, message = "Campos faltantes.")
    
    # @jwt_required(fresh=True)
    @blp.response(204)
    def delete(self, id):
        user = UsersModel.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return 'Eliminado', 204
    
@blp.route('/usuarios/<string:email>', methods=["GET"])
class UsersEmail(MethodView):
    # @jwt_required()
    @blp.response(200, UserSchema)
    def get(self, email):
        user = UsersModel.query.filter_by(email=email).first()
        return user, 200
    
@blp.route('/login', methods=["POST"])
class Login(MethodView):
    @blp.arguments(LoginSchema)
    @blp.response(200)
    def post(self, user_data):
        print(user_data)
        user = UsersModel.query.filter_by(email=user_data['email']).first()
        if user and pbkdf2_sha256.verify(user_data['password'], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            # refresh_token = create_refresh_token(identity=user.id, fresh=False)
            return {"access_token": access_token}, 200
        else:
            abort(401, message="Credenciales incorrectas")

@blp.route('/refresh', methods=["POST"])
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        jti = get_jwt()['jti']
        BLOCKLIST.add(jti)
        return {"access_token": new_token}, 200

@blp.route('/logout', methods=["POST"])
class Logout(MethodView):
    # @jwt_required()
    @blp.response(200)
    def post(self):
        jti = get_jwt()['jti']
        BLOCKLIST.add(jti)
        return {"message": "Logout exitoso"}, 200


from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required

from db import db


from models import ClientsModel
from schemas import ClientSchema, PutClientSchema

blp = Blueprint('clients', __name__, description='Clientes')


@blp.route('/clientes', methods=["GET", "POST"])
class ClientsList(MethodView):
    # @jwt_required()
    @blp.response(200, ClientSchema(many=True))
    def get(self):
        clientes = ClientsModel.query.all()
        return clientes, 200
    
    # @jwt_required()
    @blp.arguments(ClientSchema)
    @blp.response(201, ClientSchema)
    def post(self, client_data):
        client = ClientsModel(
            rfc = client_data['rfc'],
            nombre = client_data['nombre'],
            colaborador_id = client_data['colaborador_id'],
            user_id = client_data['user_id']
        )
        if ClientsModel.query.filter_by(rfc=client.rfc).first():
            abort(400, message = "El RFC ya existe.")
        try:
            db.session.add(client)
            db.session.commit()
            return client, 201
        except SQLAlchemyError:
            db.session.rollback()
            abort (400, message = "Faltan campos.")

@blp.route('/clientes/<int:client_id>', methods=["GET", "PUT", "DELETE"])
class Client(MethodView):
    # @jwt_required()
    @blp.response(200, ClientSchema)
    def get(self, client_id):
        cliente = ClientsModel.query.get(client_id)
        return cliente, 200
    
    # @jwt_required()
    @blp.arguments(PutClientSchema)
    @blp.response(200, PutClientSchema)
    def put(self, client_data, client_id ):
        cliente = ClientsModel.query.get(client_id)
        print(client_data)
        if cliente:
            cliente.rfc = client_data['rfc']
            cliente.nombre = client_data['nombre']
            cliente.colaborador_id = client_data['colaborador_id']
            cliente.user_id = client_data['user_id']
        else: 
            cliente = ClientsModel(id=cliente.id, **client_data)
        try:
            db.session.add(cliente)
            db.session.commit()
            return cliente, 200
        except SQLAlchemyError:
            abort (400, message = "Faltan Campos.")

    # @jwt_required(fresh=True)
    @blp.response(204)
    def delete(self, client_id):
        cliente = ClientsModel.query.get(client_id)
        db.session.delete(cliente)
        db.session.commit()
        return 'Eliminado', 204

@blp.route('/clientes/<string:nombre>', methods=["GET"])
class ClientByName(MethodView):
    # @jwt_required()
    @blp.response(200, ClientSchema)
    def get(self, nombre):
        cliente = ClientsModel.query.filter_by(nombre=nombre).first()
        return cliente, 200
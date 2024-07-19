from flask_smorest import Blueprint, abort
from flask.views import MethodView
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required

from db import db
from models import ColaboradoresModel
from schemas import ColaboradorSchema, PutColaboradorSchema

blp = Blueprint('colaboradores', __name__, description='Colaboradores')

@blp.route('/colaboradores', methods=["GET", "POST"])
class Colaboradores(MethodView):
    # @jwt_required()
    @blp.response(200, ColaboradorSchema(many=True))
    def get(self):
        colaboradores = ColaboradoresModel.query.all()
        return colaboradores, 200
    
    # @jwt_required()
    @blp.arguments(ColaboradorSchema)
    @blp.response(201, ColaboradorSchema)
    def post(self, colaborador_data):
        colaborador = ColaboradoresModel(
            nombre = colaborador_data['nombre'],
            apellido = colaborador_data['apellido'],
            user_id = colaborador_data['user_id'],
            is_admin = colaborador_data['is_admin']
        )
        try:
            db.session.add(colaborador)
            db.session.commit()
            return colaborador, 201
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, str(e))

@blp.route('/colaboradores/<int:id>', methods=["GET", "PUT", "DELETE"])
class Colaborador(MethodView):
    # @jwt_required()
    @blp.response(200, ColaboradorSchema)
    def get(self, id):
        colaborador = ColaboradoresModel.query.get(id)
        return colaborador, 200
    
    # @jwt_required()
    @blp.arguments(PutColaboradorSchema)
    @blp.response(200, PutColaboradorSchema)
    def put(self, colaborador_data, id):
        colaborador = ColaboradoresModel.query.get(id)
        if colaborador:
            colaborador.nombre = colaborador_data['nombre']
            colaborador.apellido = colaborador_data['apellido']
            colaborador.user_id = colaborador_data['user_id']
        else:
            colaborador = ColaboradoresModel(id=colaborador.id, **colaborador_data)
        try:
            db.session.add(colaborador)
            db.session.commit()
            return colaborador, 200
        except SQLAlchemyError as e:
            abort(400, str(e))

    # @jwt_required(fresh=True)
    @blp.response(204)
    def delete(self, id):
        colaborador = ColaboradoresModel.query.get(id)
        db.session.delete(colaborador)
        db.session.commit()
        return 'Eliminado', 204
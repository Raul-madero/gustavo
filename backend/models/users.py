from db import db

class UsersModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    verificado = db.Column(db.Boolean, default=False)
    # client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    clientes = db.relationship('ClientsModel', back_populates='user', uselist=True, cascade="all, delete, delete-orphan", single_parent=True)
    # colaborador_id = db.Column(db.Integer, db.ForeignKey('colaboradores.id'))
    colaborador = db.relationship('ColaboradoresModel', back_populates='user', uselist=False, cascade="all, delete, delete-orphan", single_parent=True)
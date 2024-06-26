from db import db

class UsersModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String, nullable=False)
    telefono = db.Column(db.String(100), nullable=False)
    cliente = db.relationship('ClientsModel', back_populates='user', lazy="dynamic", cascade="all, delete, delete-orphan")
    colaborador = db.relationship('ColaboradoresModel', back_populates='user', uselist=False, cascade="all, delete, delete-orphan")
from db import db

class ColaboradoresModel(db.Model):
    __tablename__ = 'colaboradores'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False)
    clientes = db.relationship('ClientsModel', back_populates='colaborador', lazy="dynamic", cascade="all, delete, delete-orphan")
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('UsersModel', back_populates='colaborador')
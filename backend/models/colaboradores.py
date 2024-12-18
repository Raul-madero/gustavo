from db import db

class ColaboradoresModel(db.Model):
    __tablename__ = 'colaboradores'

    id = db.Column(db.Integer, primary_key=True)
    is_admin = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    clientes = db.relationship('ClientsModel', back_populates='colaborador', lazy="dynamic", cascade="all, delete, delete-orphan", single_parent=True)
    user = db.relationship('UsersModel', back_populates='colaborador')
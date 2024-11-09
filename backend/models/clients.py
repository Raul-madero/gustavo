from db import db

class ClientsModel(db.Model):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    rfc = db.Column(db.String(13), nullable=False, unique=True)
    nombre = db.Column(db.String(100), nullable=False)
    colaborador_id = db.Column(db.Integer, db.ForeignKey('colaboradores.id'))
    colaborador = db.relationship('ColaboradoresModel', back_populates='clientes')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('UsersModel', back_populates='clientes')
    documentos = db.relationship('DocumentsModel', back_populates='client')
from db import db

class DocumentsModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    tipo = db.Column(db.String(100), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    client = db.relationship('ClientsModel', back_populates='documentos') 
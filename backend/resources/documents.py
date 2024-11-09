from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required
from flask import request, flash, redirect, url_for
from werkzeug.utils import secure_filename

from db import db
import os

from models import DocumentsModel
from schemas import DocumentSchema

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = { 'pdf', 'xlxs', '.docxs'}

blp = Blueprint('documents', __name__, description='Documentos')

@blp.route('/documentos', methods=["GET", "POST"])
class DocumentsList(MethodView):
    # @jwt_required()
    @blp.response(200, DocumentSchema(many=True))
    def get(self):
        documentos = DocumentsModel.query.all()
        return documentos, 200
    
    # @jwt_required()
    @blp.arguments(DocumentSchema)
    @blp.response(201, DocumentSchema)
    def post(self, document_data):
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        def allowed_file(filename):
            return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return redirect(url_for('download_file', name=filename))
        documento = DocumentsModel(**document_data)
        db.session.add(documento)
        db.session.commit()
        return documento, 201

@blp.route('/documentos/<int:cliente_id>', methods=["GET"])
class Document(MethodView):
    # @jwt_required()
    @blp.response(200, DocumentSchema)
    def get(self, client_id):
        documento = DocumentsModel.query.get(client_id)
        return documento, 200
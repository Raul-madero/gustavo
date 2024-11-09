from marshmallow import Schema, fields

#esquema de colaborador
class ColaboradorSchema(Schema):
    id = fields.Int(dump_only=True)
    is_admin = fields.Bool(required=True)
    user_id = fields.Int(required=True, ForeignKey='user.id')
    user = fields.Nested('UserSchema', many=False)
    # clientes = fields.Nested('ClientSchema', many=True)

# esquema de cliente
class ClientSchema(Schema):
    id = fields.Int(dump_only=True)
    rfc = fields.Str(required=True, unique=True)
    nombre = fields.Str(required=True)
    colaborador_id = fields.Int()
    user_id = fields.Int(required=True, foreign_key='users.id')
    colaborador = fields.Nested(ColaboradorSchema, many=False)
    user = fields.Nested('UserSchema', many=False)

class PutClientSchema(Schema):
    rfc = fields.Str()
    nombre = fields.Str()
    colaborador_id = fields.Int()
    # user_id = fields.Int()

# esquema de login
class LoginSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)


# esquema de usuario
class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=False)
    apellido = fields.Str(required=False)
    email = fields.Str(required=False)
    password = fields.Str(required=False, load_only=True)
    verificado = fields.Bool()
    # client_id = fields.Int(required=False, foreign_key='clients.id')
    # colaborador_id = fields.Int(required=False, foreign_key='colaborador.id')
    # colaborador = fields.Nested(ColaboradorSchema, many=False)
    # clientes = fields.Nested(ClientSchema, many=True)

class PutUserSchema(Schema):
    nombre = fields.Str()
    apellido = fields.Str()
    email = fields.Str()
    password = fields.Str(load_only=True)
    verificado = fields.Bool()

# esquema de documentos
class DocumentSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=True)
    url = fields.Str(required=True)
    fecha = fields.Date(required=True)
    tipo = fields.Str(required=True)
    client_id = fields.Int(required=True, foreign_key='clients.id')
    client = fields.Nested(ClientSchema, many=False)
from marshmallow import Schema, fields


class ClientSchema(Schema):
    id = fields.Int(dump_only=True)
    rfc = fields.Str(required=True)
    nombre = fields.Str(required=True)
    giro = fields.Str(required=True)
    contacto = fields.Str(required=True)
    colaborador_id = fields.Int(required=True)
    user_id = fields.Int(required=True)
    # colaborador = fields.Nested(ColaboradorSchema, many=False)
    # user = fields.Nested(UserSchema, many=False)

class PutClientSchema(Schema):
    rfc = fields.Str()
    nombre = fields.Str()
    giro = fields.Str()
    contacto = fields.Str()
    colaborador_id = fields.Int()
    user_id = fields.Int()


class ColaboradorSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=True)
    apellido = fields.Str(required=True)
    is_admin = fields.Bool(required=True)
    user_id = fields.Int(required=True)
    clientes = fields.Nested(ClientSchema, many=True)
    # user = fields.Nested(UserSchema, many=False)

class PutColaboradorSchema(Schema):
    nombre = fields.Str()
    apellido = fields.Str()
    user_id = fields.Int()

class PutUserSchema(Schema):
    rfc = fields.Str()
    email = fields.Str()
    password = fields.Str()
    telefono = fields.Str()

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    telefono = fields.Str(required=True)
    colaboradores_id = fields.Int()
    cliente = fields.Nested(ClientSchema, many=True)
    colaborador = fields.Nested(ColaboradorSchema, many=False)

class LoginSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)
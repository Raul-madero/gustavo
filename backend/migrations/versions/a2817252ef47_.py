"""empty message

<<<<<<<< HEAD:backend/migrations/versions/12a9b68a642b_.py
Revision ID: 12a9b68a642b
Revises: 
Create Date: 2024-06-18 10:47:32.693605
========
Revision ID: a2817252ef47
Revises: 
Create Date: 2024-06-14 19:45:49.914069
>>>>>>>> 4c586b7d70b1cfed0e94c53d7b4b85d32e82ea8a:backend/migrations/versions/a2817252ef47_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:backend/migrations/versions/12a9b68a642b_.py
revision = '12a9b68a642b'
========
revision = 'a2817252ef47'
>>>>>>>> 4c586b7d70b1cfed0e94c53d7b4b85d32e82ea8a:backend/migrations/versions/a2817252ef47_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('telefono', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('colaboradores',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=100), nullable=False),
    sa.Column('apellido', sa.String(length=100), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('clients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rfc', sa.String(length=13), nullable=False),
    sa.Column('nombre', sa.String(length=100), nullable=False),
    sa.Column('giro', sa.String(length=100), nullable=False),
    sa.Column('contacto', sa.String(length=100), nullable=False),
    sa.Column('colaborador_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['colaborador_id'], ['colaboradores.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('clients')
    op.drop_table('colaboradores')
    op.drop_table('users')
    # ### end Alembic commands ###

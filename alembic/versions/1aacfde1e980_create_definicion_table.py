"""create definicion table

Revision ID: 1aacfde1e980
Revises: 
Create Date: 2024-09-21 00:35:31.952222

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1aacfde1e980'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('definiciones',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('acepcion', sa.String),
        sa.Column('respuesta', sa.String),
        sa.Column('categoria_palabra', sa.String),
        sa.Column('tambien_valen', sa.String),
        sa.Column('no_valen', sa.String),
        sa.Column('aciertos_testers', sa.Integer),
    )


def downgrade() -> None:
    op.drop_table('definiciones')
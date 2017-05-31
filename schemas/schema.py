from marshmallow_sqlalchemy import ModelSchema

from alchemy import db


class BaseSchema(ModelSchema):
    class Meta:
        sqla_session = db.session
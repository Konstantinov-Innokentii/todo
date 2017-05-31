from models.note import Note
from .schema import BaseSchema


class NoteSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Note
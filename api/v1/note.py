from flask.ext.restful.reqparse import RequestParser
from flask_restful import Resource
from flask import request

from alchemy import db
from models.note import Note
from schemas.note import NoteSchema
from .api_v1 import api_v1


note_schema = NoteSchema()
notes_schema = NoteSchema(many=True)


class NoteResource(Resource):

    def get(self, id):
        note = db.session.query(Note).get(id)
        return note_schema.dump(note).data

    def delete(self, id):
        note = db.session.query(Note).get(id)
        db.session.delete(note)
        db.session.commit()

        return {}, 204

    def put(self, id):
        note = note_schema.load(request.json)
        db.session.commit()
        return note_schema.dump(note.data).data, 201

class NoteListResource(Resource):

    def get(self):
        notes = db.session.query(Note).all()
        return notes_schema.dump(notes).data

    def post(self):
        note = note_schema.load(request.json)
        db.session.add(note.data)
        db.session.commit()
        print("WOW SUCH A POST")
        return note_schema.dump(note.data).data, 201

api_v1.add_resource(NoteListResource, "/note")
api_v1.add_resource(NoteResource, "/note/<int:id>")

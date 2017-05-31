
from flask import Blueprint
from flask_restful import Api, Resource, abort


class NoResource(Resource):

    def get(self, path):
        abort(404)


api_v1_bp = Blueprint('api_v1', __name__, template_folder="templates")

api_v1 = Api(api_v1_bp)

api_v1.add_resource(NoResource, '/<path:path>')
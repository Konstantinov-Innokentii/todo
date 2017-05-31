from flask import Flask, render_template, redirect, url_for, jsonify,request
from models import Note
from alchemy import db

from models import *
from api import api_v1_bp

app = Flask(__name__)
app.config.from_object('config')

db.init_app(app)

app.register_blueprint(api_v1_bp, url_prefix="/api/v1")

@app.route('/todos', methods=['GET', 'POST','DELETE'])
def render():
    return render_template("index.html")

# @app.route('/todos/<id>',methods=['GET', 'PUT','DELETE'])
# def render_todo(id):
#     if request.method == 'GET':
#         return redirect('api/v1/note/{}'.format(id))
#     if request.method == 'PUT':
#         print("PUT")
#     if request.method == 'DELETE':
#         print("DELETE")



if __name__ == '__main__':
    app.run()
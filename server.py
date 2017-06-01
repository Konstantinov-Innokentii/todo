from flask import Flask, render_template, redirect, url_for, jsonify,request
from models import Note
from alchemy import db

from models import *
from api import api_v1_bp

app = Flask(__name__)
app.config.from_object('config')

db.init_app(app)

app.register_blueprint(api_v1_bp, url_prefix="/api/v1")

@app.route('/todos', methods=['GET', 'POST','DELETE','PUT'])
def render():
    return render_template("index.html")


if __name__ == '__main__':
    app.run()

from flask import Flask, jsonify, request, make_response, render_template, session
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api, Resource, marshal_with, fields

from flask_cors import CORS, cross_origin

from models import db, User, Score, UserScore

import os

abs_path = os.getcwd()
abs_python_path = os.path.normpath(abs_path)


app = Flask(__name__)
app.config['SECRET_KEY'] = 'codeitownit'
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{abs_path}/db/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
bcrypt = Bcrypt(app) 
migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

user_fields={
    'id': fields.Integer,
    'name': fields.String,
    'email': fields.String,
    'password': fields.String,
}

class Index(Resource):  
    @cross_origin
    def get(self):
        response_dict = {
            "index": "Welcome to the Heros RESTful API",
        }
        return jsonify(response_dict) 
    
 
api.add_resource(Index, '/')

@app.route("/", methods=["POST"])
def signup():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password).decode('utf8')
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "password": new_user.password,
    })
 
@app.route("/client/src/components/UserLogin.js", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Email does not exist"}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Password is incorrect"}), 401
    session["user_id"] = user.id
    return jsonify({
        "id": user.id,
        "email": user.email,
        "password": user.password,
        "created_at": user.created_at
        
    })




if __name__ == '__main__':
     app.run(port=5555, debug=True)

# from flask import Flask, jsonify, request, session
# from flask_bcrypt import Bcrypt
# from flask_migrate import Migrate
# from flask_restful import Api, Resource, fields
# from models import UserScore
# from flask_cors import CORS, cross_origin

# from models import db, User, Score, UserScore

# import os

# abs_path = os.getcwd()

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'codeitownit'
# CORS(app, supports_credentials=True)
# app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{abs_path}/db/app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
#  # Corrected attribute name
# bcrypt = Bcrypt(app)
# migrate = Migrate(app, db)

# db.init_app(app)

# api = Api(app)

# user_fields = {
#     'id': fields.Integer,
#     'username': fields.String,
#     'email': fields.String,
#     'password': fields.String,
# }

# class Index(Resource):
#     @cross_origin()
#     def get(self):
#         response_dict = {
#             "index": "Welcome to the Heros RESTful API",
#         }
#         return jsonify(response_dict)

# api.add_resource(Index, '/')

# @app.route("/", methods=["POST"])
# def signup():
#     username = request.json["username"]
#     email = request.json["email"]
#     password = request.json["password"]

#     user_exists = User.query.filter_by(email=email).first() is not None

#     if user_exists:
#         return jsonify({"error": "Email already exists"}), 409

#     hashed_password = bcrypt.generate_password_hash(password).decode('utf8')
#     new_user = User(username=username, email=email, password=hashed_password)
#     db.session.add(new_user)
#     db.session.commit()

#     session["user_id"] = new_user.id

#     return jsonify({
#         "id": new_user.id,
#         "username": new_user.username,
#         "email": new_user.email,
#         "password": new_user.password,
#     })
# # app.py

# # app.py

# # ... (existing imports)
# @app.route("/get_scores", methods=["GET"])
# def get_scores():
#     print("Request received for get_scores")  # Debug print
#     # Use a join to fetch scores along with associated user information
#     scores = db.session.query(User.username, Score.score_value, Score.round_number).\
#         join(UserScore, User.id == UserScore.user_id).\
#         join(Score, Score.id == UserScore.score_id).all()

#     scores_list = [
#         {
#             "username": username,
#             "score_value": score_value,
#             "round_number": round_number
#         }
#         for username, score_value, round_number in scores
#     ]

#     print("Server returning scores:", scores_list)  # Debug print
#     return jsonify(scores_list)

# # app.py
# # app.py

# # ... (existing imports)
# # ... (existing imports)
# @app.route("/save_scores", methods=["POST", "OPTIONS"])
# def save_scores():
#     try:
#         data = request.json
#         x_score = data.get("xScore", 0)
#         o_score = data.get("oScore", 0)

#         # Determine the round number based on the number of existing scores
#         round_number = (Score.query.count() // 2) + 1
#         print("Received data:", data)  # Debug print

#         # Save scores to the database
#         new_score_x = Score(score_value=x_score, round_number=round_number)
#         new_score_o = Score(score_value=o_score, round_number=round_number)

#         db.session.add_all([new_score_x, new_score_o])
#         db.session.commit()
#         print("Scores saved successfully")  # Debug print

#         # Create UserScore objects and associate them with the User and Score objects
#         new_user = User.query.first()  # Replace with your logic to fetch the user
#         new_user_score_x = UserScore(user_id=new_user.id, score_id=new_score_x.id)
#         new_user_score_o = UserScore(user_id=new_user.id, score_id=new_score_o.id)

#         db.session.add_all([new_user_score_x, new_user_score_o])
#         db.session.commit()

#         # Check if the game has ended (e.g., after 5 rounds)
#         if round_number >= 5:
#             return jsonify({"message": "Game Over. Scores saved successfully.", "end_game": True})

#         return jsonify({"message": "Scores saved successfully", "end_game": False})
#     except Exception as e:
#         print("Error saving scores:", str(e))
#         return jsonify({"error": "Internal server error"}), 500


# if __name__ == '__main__':
#      app.run(port=5555, debug=True)








from flask import Flask, jsonify, request, session,make_response
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api, Resource, fields
from models import UserScore
from flask_cors import CORS, cross_origin

from models import db, User, Score, UserScore

import os

abs_path = os.getcwd()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'codeitownit'
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{abs_path}/db/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
 # Corrected attribute name
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
    'password': fields.String,
}

class Index(Resource):
    @cross_origin()
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
# app.py

# app.py

# ... (existing imports)
@app.route("/get_scores", methods=["GET"])
def get_scores():
    print("Request received for get_scores")  # Debug print
    # Use a join to fetch scores along with associated user information
    scores = db.session.query(User.username, Score.score_value, Score.round_number).\
        join(UserScore, User.id == UserScore.user_id).\
        join(Score, Score.id == UserScore.score_id).all()

    scores_list = [
        {
            "username": username,
            "score_value": score_value,
            "round_number": round_number
        }
        for username, score_value, round_number in scores
    ]

    print("Server returning scores:", scores_list)  # Debug print
    return jsonify(scores_list)

# app.py
# app.py

# ... (existing imports)
# ... (existing imports)
@app.route("/save_scores", methods=["POST", "OPTIONS"])
@cross_origin()  # Add this decorator to handle CORS for the specific route
def save_scores():
    if request.method == "OPTIONS":
        # Handling preflight request, return empty response with appropriate CORS headers
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST"
        return response

    try:
        data = request.json
        x_score = data.get("xScore", 0)
        o_score = data.get("oScore", 0)
        # Determine the round number based on the number of existing scores
        round_number = (Score.query.count() // 2) + 1
        print("Received data:", data)  # Debug print

        # Save scores to the database
        new_score_x = Score(score_value=x_score, round_number=round_number)
        new_score_o = Score(score_value=o_score, round_number=round_number)

        db.session.add_all([new_score_x, new_score_o])
        db.session.commit()
        print("Scores saved successfully")  # Debug print

        # Create UserScore objects and associate them with the User and Score objects
        new_user = User.query.first()  # Replace with your logic to fetch the user
        new_user_score_x = UserScore(user_id=new_user.id, score_id=new_score_x.id)
        new_user_score_o = UserScore(user_id=new_user.id, score_id=new_score_o.id)

        db.session.add_all([new_user_score_x, new_user_score_o])
        db.session.commit()

        # Check if the game has ended (e.g., after 5 rounds)
        if round_number >= 5:
            return jsonify({"message": "Game Over. Scores saved successfully.", "end_game": True})
        return jsonify({"message": "Scores saved successfully", "end_game": False})
    except Exception as e:
        print("Error saving scores:", str(e))
        return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
     app.run(port=5555, debug=True)

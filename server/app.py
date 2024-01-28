

from flask import Flask, jsonify, request, session, make_response
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api, Resource, fields
from models import UserScore
from flask_cors import CORS, cross_origin
from sqlalchemy import func

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

@app.route("/")
def home():
    return jsonify({"home": "welcome to tictactoe"})

@app.route("/signup", methods=["POST"])
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
    }), 201

@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
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
            
        })

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

@app.route("/save_scores", methods=["POST", "OPTIONS"])
@cross_origin()  # Add this decorator to handle CORS for the specific route
def save_scores():
    if request.method == "OPTIONS":
        # Handling preflight request, return empty response with appropriate CORS headers
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"  # Add OPTIONS method
        return response

    try:
        data = request.json
        x_score = data.get("xScore")
        o_score = data.get("oScore")

        # Check if the usernames already exist
        user_x = User.query.filter_by(username="Player Blue").first()
        user_o = User.query.filter_by(username="Player Orange").first()

        if not user_x:
            # Create User object for Player Blue
            user_x = User(username="Player Blue", email="player_x@example.com", password="password_x")
            db.session.add(user_x)

        if not user_o:
            # Create User object for Player Orange
            user_o = User(username="Player Orange", email="player_o@example.com", password="password_o")
            db.session.add(user_o)

        db.session.commit()

        # Determine the round number based on the number of existing scores for the current game
        max_round_number = db.session.query(func.max(Score.round_number)).scalar()
        round_number = max_round_number + 1 if max_round_number else 1

        print("Received data:", data)  # Debug print

        # Save scores to the database
        new_score_x = Score(score_value=x_score, round_number=round_number)
        new_score_o = Score(score_value=o_score, round_number=round_number)

        db.session.add_all([new_score_x, new_score_o])
        db.session.commit()
        print("Scores saved successfully")  # Debug print

        # Create UserScore objects and associate them with the User and Score objects
        new_user_score_x = UserScore(user_id=user_x.id, score_id=new_score_x.id)
        new_user_score_o = UserScore(user_id=user_o.id, score_id=new_score_o.id)

        db.session.add_all([new_user_score_x, new_user_score_o])
        db.session.commit()

        # Debug prints to check values
        print(f"Player: {user_x.username}, Score: {new_score_x.score_value}, Round: {round_number}")
        print(f"Player: {user_o.username}, Score: {new_score_o.score_value}, Round: {round_number}")

        # Check if the game has ended (e.g., after 5 rounds)
        if round_number >= 5:
            return jsonify({"message": "Game Over. Scores saved successfully.", "end_game": True, "round_number": round_number})

        return jsonify({"message": "Scores saved successfully", "end_game": False, "round_number": round_number})
    except Exception as e:
        print("Error saving scores:", str(e))
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(port=5555, debug=True)

from flask import Flask
from server.models import db, Score, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project-tic-tac.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    new_user = {
        'username': 'Tim',
        'password': 123665
    }
    new_score = {
        'scores': 2
    }
    user = User(**new_user)
    score = Score(**new_score)

    with db.session.begin():
        db.session.add(user)
        db.session.add(score)
        db.session.commit()

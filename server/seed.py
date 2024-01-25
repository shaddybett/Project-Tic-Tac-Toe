from flask import Flask
from models import db, Score, User
import os

abs_path = os.getcwd()
abs_python_path = os.path.normpath(abs_path)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{abs_path}/db/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    new_user = {
        'username': 'Tim',
        'email': 'tim@gmail.com',
        'password': 123665
    }
    new_score = {
        'score': 2
    }
    user = User(**new_user)
    score = Score(**new_score)

    with db.session.begin():
        db.session.add(user)
        db.session.add(score)
        db.session.commit()

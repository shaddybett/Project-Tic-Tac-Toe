
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    user_scores = db.relationship('UserScore', backref='user', lazy=True)
    is_active = db.Column(db.Boolean(), default=True)

    def get_id(self):
        return str(self.id)


class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score_value = db.Column(db.Integer, nullable=False)
    user_scores = db.relationship('UserScore', backref='score', lazy=True)
    round_number = db.Column(db.Integer) 
class UserScore(db.Model):
    __tablename__ = 'user_score'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    score_id = db.Column(db.Integer, db.ForeignKey('score.id'), nullable=False)



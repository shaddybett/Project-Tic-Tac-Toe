from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()

class User(db.Model):
    __tablename__='users'
    id = db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(200),nullable=False,unique=True)
    password=db.Column(db.Integer,nullable=False)

    def to_dict(self):
        return {
            'id':self.id,
            'username':self.username,
            'password':self.password
        }
    def set_password(self,password):
        self.password = generate_password_hash(password)

    def check_password(self,password):
        return check_password_hash(self.password,password)    

class Score(db.Model):
    __tablename__='scores'
    id = db.Column(db.Integer,primary_key=True)
    scores = db.Column(db.Integer,nullable=False)

    def to_dict(self):
        return {
            'id':self.id,
            'scores':self.scores 
        }
   
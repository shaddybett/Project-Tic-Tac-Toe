from flask import Flask,request,jsonify
from flask_restful import Api,Resource
from server.models import db,User,Score
from flask_migrate import Migrate


app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///project-tic-tac.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db.init_app(app)
migrate = Migrate(app, db)

class UserSection(Resource):
    def post(self):
        data = request.get_json()
        if 'username' not in data or 'password' not in data:
            return {'error': 'Username and pasword are required'},400
        new_user= User(
            username=data.get('username'),
            password=data.get('password')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()),201
    

class ScoreSection(Resource):
    def post(self):
        data = request.get_json()
        new_score=Score(
            scores=data.get('scores')
        )
        db.session.add(new_score)
        db.session.commit()
        return jsonify(new_score.to_dict()),201
    
api.add_resource(UserSection,'/user')
api.add_resource(ScoreSection,'/score')    

if __name__=='__main__':
    app.run(debug=True,port=4000)


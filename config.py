# importações
from flask import Flask,jsonify
from flask_sqlalchemy import SQLAlchemy
import os

# configurações
app = Flask(__name__)
# caminho do arquivo de banco de dadoss
path = os.path.dirname(os.path.abspath(__file__)) # sugestao do Kaue
arquivobd = os.path.join(path, 'sapato.db')
# sqlalchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+arquivobd
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # remover warnings
db = SQLAlchemy(app)
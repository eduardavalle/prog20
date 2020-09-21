from config import *
from modelo_sapato import Sapato

@app.route("/")
def inicio():
    return 'Sistema de cadastro de sapatos. '+\
        '<a href="/listagem_sapatos">Operação listar</a>'

@app.route("/listagem_sapatos")
def listagem_sapatos():
    sapatos = db.session.query(Sapato).all()
    sapato_em_json = [ sapato.json() for sapato in sapatos ]
    resposta = jsonify(sapato_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
    

app.run(debug=True)


from config import *
from modelo_sapato import Sapato

@app.route("/")
def inicio():
    return 'Sistema de cadastro de sapatos. '+\
        '<a href="/listar_pessoas">Operação listar</a>'

@app.route("/listar_pessoas")
def listar_pessoas():
    # obter as pessoas do cadastro
    sapato = db.session.query(Sapato).all()
    # aplicar o método json que a classe Pessoa possui a cada elemento da lista
    sapato_em_json = [ x.json() for x in sapato ]
    resposta = jsonify(sapato_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar
    

app.run(debug=True)


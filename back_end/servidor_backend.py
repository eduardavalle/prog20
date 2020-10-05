from config import *
from modelo_sapato import Sapato

@app.route("/")
def inicio():
    return 'Sistema de cadastro de sapatos. '+\
        '<a href="/listar_sapatos">Operação listar</a>'

@app.route("/listar_sapatos")
def listar_sapatos():
    sapatos = db.session.query(Sapato).all()
    sapato_em_json = [ sapato.json() for sapato in sapatos ]
    resposta = jsonify(sapato_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

@app.route('/inserir_sapato', methods=['post'])
def inserir_sapato():
    response = jsonify({"status": "201", "result": "ok", "details": "Sapato criado!"})
    data = request.get_json()
    try:
        novo = Sapato(**data)
        db.session.add(novo)
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400", "result": "error", "details ": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response 
 

app.run(debug=True)


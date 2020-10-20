from config import *
from modelo_sapato import Sapato


@app.route("/listar_sapatos", methods=['get'])
def listar_sapatos():
    sapatos = db.session.query(Sapato).all()
    sapatos_json = [ sapato.json() for sapato in sapatos ]
    resposta = jsonify(sapatos_json)
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

# teste: curl -X DELETE http://localhost:5000/excluir_sapato/1 
@app.route("/excluir_sapato/<int:id>", methods=['DELETE']) 
def excluir_sapato(id):  
   resposta = jsonify({"resultado": "ok", "detalhes": "ok"}) 
   try:  
      Sapato.query.filter(Sapato.id == id).delete() 
      db.session.commit() 
   except Exception as e: 
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
   resposta.headers.add("Access-Control-Allow-Origin", "*") 
   return resposta
 

app.run(debug=True)


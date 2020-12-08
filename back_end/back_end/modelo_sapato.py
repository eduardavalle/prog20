from config import *

class Sapato(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String(254))
    marca = db.Column(db.String(254))
    cor = db.Column(db.String(254))

    sapateira = db.relationship("Sapateira", back_populates="sapato")

    def __str__(self):
        return f" {self.id} - {self.modelo}, {self.marca}, {self.cor}"

    
    def json(self): 
         return { 
             "id": self.id, 
             "modelo": self.modelo, 
             "marca": self.marca, 
             "cor": self.cor
        }

class Pessoa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(128))
    sexo = db.Column(db.String(128))

    sapateira = db.relationship("Sapateira", back_populates="pessoa")


    def __str__(self):
        return f"{self.id} - {self.nome}, {self.sexo}"


    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "sexo": self.sexo
        }

class Sapateira(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    capacidade = db.Column(db.Integer)
    cor = db.Column(db.String(128))
    material = db.Column(db.String(128))

    sapato_id = db.Column(db.Integer, db.ForeignKey(Sapato.id), nullable=False)
    sapato = db.relationship("Sapato", back_populates="sapateira")

    pessoa_id = db.Column(db.Integer, db.ForeignKey(Pessoa.id), nullable=False)
    pessoa = db.relationship("Pessoa", back_populates="sapateira")


    def __str__(self):
        return f"Sapateira: {self.id} - {self.capacidade}, {self.cor}, {self.material}" +\
               f"\nPessoa: {self.pessoa}\nSapato: {self.sapato}"


    def json(self):
        return {
            "id": self.id,
            "capacidade": self.capacidade,
            "cor": self.cor,
            "material": self.material,
            "sapato_id": self.sapato_id,
            "sapato": self.sapato.json(),
            "pessoa_id": self.pessoa_id,
            "pessoa": self.pessoa.json(),
        }

if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    s1 = Sapato(modelo="tenis", marca="rebook", cor=" branco")
    db.session.add(s1)

    p1 = Pessoa(nome="Juquinha", sexo= "masculino")
    db.session.add(p1)

    sapateira1 = Sapateira(capacidade=7, cor="branco", material="Metal",
                sapato=s1, pessoa=p1)
    db.session.add(p1)

    db.session.commit()

    print(s1)
    print(s1.json())
    print('\n')
    print(p1)
    print(p1.json())
    print('\n')
    print(sapateira1)
    print(sapateira1.json())



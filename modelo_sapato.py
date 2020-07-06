from config import *

class Sapato(db.Model):
    # atributos da pessoa
    id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String(254))
    marca = db.Column(db.String(254))
    cor = db.Column(db.String(254))

    # método para expressar a pessoa em forma de texto
    def __str__(self):
        return str(self.id)+") "+ self.modelo + ", " +\
            self.marca + ", " + self.cor
    
    # expressao da classe no formato json 
    def json(self): 
         return { 
             "id": self.id, 
             "modelo": self.modelo, 
             "marca": self.marca, 
             "cor": self.cor
        }
# teste    
if __name__ == "__main__":
    # apagar o arquivo, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # criar tabelas
    db.create_all()

    # teste da classe Pessoa
    s1 = Sapato(modelo = "Tenis", marca = "Vans", cor = "Cinza")
    s2 = Sapato(modelo = "Chinelo", marca = "Ipanema", cor = "Branco")  
    s3 = Sapato(modelo = "Bota", marca = "UGG", cor = "Marrom")
    s4 = Sapato(modelo = "Sandalia", marca = "Melissa", cor = "Rosa")
    s5 = Sapato(modelo = "Sapatilha", marca = "Amaro", cor = "preta")      
    
    # persistir
    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.add(s4)
    db.session.add(s5)
    db.session.commit()
    
    # exibir
    print(s1.json())
    print(s2.json())
    print(s3.json())
    print(s4.json())
    print(s5.json())
$(function() {
    $.ajax({
        url: 'http://localhost:5000/listagem_sapatos',
        method: 'GET',
        dataType: 'json',
        success: listarSapato,
        error: function() {
            alert("ERRO");
        }
    });
  
    function listarSapato(sapatos) {
        for (sapato of sapatos) {
            novaLinha = `<tr>
                        <td>${sapato.modelo}</td>
                        <td>${sapato.marca}</td>
                        <td>${sapato.cor}</td>
                      </tr>`;
            $('#tabelaSapatos').append(novaLinha);
        }
    }
 });
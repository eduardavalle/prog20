$(function() {
    changePage('inicial');
    $('#link-listar').click(function () {
    $.ajax({
        url: 'http://localhost:5000/listar_sapatos',
        method: 'GET',
        dataType: 'json',
        success: listarSapato,
        error: function() {
            alert("Deu zebra");
        },
    });
});  

    $('#link-inicial').click(function () {
        changePage('inicial');
    });

    $('#nav-brand').click(function () {
        changePage('inicial');
    });

    $('#btn-incluir').click(function () {
        const modelo = $('#campo-modelo').val();
        const marca = $('#campo-marca').val();
        const cor = $('#campo-cor').val();
        
        const sapatoData = JSON.stringify({
            modelo: modelo,
            marca: marca,
            cor: cor,
    });

        $.ajax({
            url: 'http://localhost:5000/inserir_sapato',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: sapatoData,
            success: inserirSapato,
            error: erroInserir,
        });
    });

    function inserirSapato(resposta) {
    if (resposta.result == 'ok') {
            alert('Sapato inserido na lista')
            $('#campo-modelo').val('');
            $('#campo-marca').val('');
            $('#campo-cor').val('');
        } else {
            alert('Erro ao inserir sapato na lista')
        } 
    }

    function erroInserir(resposta){
        alert('Erro na chamada do back-end')
    }
  
    function listarSapato(sapatos) {
        var linhas = '';

        for (sapato of sapatos) {
            novaLinha = `<tr>
                        <td>${sapato.modelo}</td>
                        <td>${sapato.marca}</td>
                        <td>${sapato.cor}</td>
                      </tr>`;
            linhas += novaLinha;         
            $('#tabelaSapatos').html(linhas);

        }
        changePage('listar');
      }
    
    function changePage(nextPage) {
        $('#container-inicial').addClass('invisible');
        $('#container-listar').addClass('invisible');
        $(`#container-${nextPage}`).removeClass('invisible');
    }
});

$(function() {

    function mostrarSapatos() {
        $.ajax({
            url: 'http://localhost:5000/listar_sapatos',
            method: 'GET',
            dataType: 'json',
            success: listarSapato,
            error: function() {
                alert("Deu zebra");
            },
        });
    
        function listarSapato(sapatos) {
            $("#corpoTabelaSapato").empty();
            showContent("tabela-sapato");
            var linhas = '';

            for (sapato of sapatos) {
                novaLinha = `<tr id="linha_${sapato.id}">  
                                <td>${sapato.id}</td> 
                                <td>${sapato.modelo}</td> 
                                <td>${sapato.marca}</td> 
                                <td>${sapato.cor}</td> 
                                <td>
                                    <a href="#" id="excluir_${sapato.id}" class="excluir_sapato" title="Excluir Sapato">
                                        deletar
                                    </a>
                                </td>
                                </tr>`;
                linhas += novaLinha;
                $('#corpoTabelaSapato').html(linhas);
            }
        }
    }

    function showContent(nextPage) {
        $("#inicio").addClass("invisible");
        $("#tabela-sapato").addClass("invisible");
        $(`#${nextPage}`).removeClass("invisible");
    }


    $('#link-listar').click(function () {
        mostrarSapatos();
    });
    
    $("#link-inicial").click(function() {
        showContent("inicio");
    });
    
    $('#nav-brand').click(function () {
        showContent("inicio");
    });

    $(document).on("click", "#btn-incluir", function() {
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
    });
  
    $('#modal-incluir').on('hidden.bs.modal', function(e) {
        if (!$('#tabela-sapato').hasClass('invisible')) {
          mostrarSapatos();
        }
    });
   
    $(document).on("click", ".excluir_sapato", function() {
        var component = $(this).attr("id");
        
        var icon_name = "excluir_";
        var sapato_id = component.substring(icon_name.length);

    
        $.ajax({
            url: 'http://localhost:5000/excluir_sapato/'+sapato_id,
            type: 'DELETE', 
            dataType: 'json', 
            success: sapatoExcluido, 
            error: erroAoExcluir
        });

        
        function sapatoExcluido (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + sapato_id).fadeOut(1000, function(){
                    alert("Sapato removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }

        });
    showContent("inicio");
});

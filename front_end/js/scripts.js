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
        $("#inicio").addClass("d-none");
        $("#tabela-sapato").addClass("d-none");
        $("#tabela-sapateiras").addClass("d-none");
        $("#tabela-pessoas").addClass("d-none");
        $(`#${nextPage}`).removeClass("d-none")
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

    function listar_pessoas() {
    $.ajax({
        url: 'http://localhost:5000/listar_pessoas',
        method: 'GET',
        dataType: 'json', 
        success: listar, 
        error: function(problema) {
            alert("erro ao ler dados das pessoas, verifique o backend: ");
        }
    });
    function listar (pessoas) {
        $('#corpoTabelaPessoas').empty();
        showContent("tabela-pessoas")    
        var linhas = '';
        for (pessoa of pessoas) { 
            novaLinha = '<tr id="linha_pessoa'+pessoa.id+'">' + 
            '<td>' + pessoa.nome + '</td>' + 
            '<td>' + pessoa.sexo + '</td>' + 
            '</tr>';
            linhas += novaLinha;
            $('#corpoTabelaPessoas').append(novaLinha);
        }
    }
  }

  $(document).on("click", "#linkListarPessoas", function() {
    listar_pessoas();
  });


  function listar_sapateiras() {
    $.ajax({
        url: 'http://localhost:5000/listar_sapateiras',
        method: 'GET',
        dataType: 'json',
        success: listar,
        error: function(problema) {
            alert("erro ao ler dados da sapateira, verifique o backend: ");
        }
    });
    function listar (sapateiras) {
        $('#corpoTabelaSapateiras').empty();
        showContent("tabela-sapateiras")      
        var linhas = '';
        for (sapateira of sapateiras) { 
            novaLinha = '<tr id="linha_sapateira'+sapateira.id+'">' + 
            '<td>' + sapateira.pessoa.nome + '</td>' +
            '<td>' + sapateira.sapato.modelo + '</td>' +
            '<td>' + sapateira.capacidade + '</td>' + 
            '<td>' + sapateira.material + '</td>' + 
            '<td>' + sapateira.cor + '</td>' + 
            '</tr>';
            linhas += novaLinha;
            $('#corpoTabelaSapateiras').append(novaLinha);
        }
    }
  }

  $(document).on("click", "#linkListarSapateiras", function() {
    listar_sapateiras();
  })

    showContent("inicio");
});

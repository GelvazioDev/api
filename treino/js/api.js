// preenche os dados da folha de pagamento
// chamada da api

// https://www.javascripttutorial.net/dom/events/add-an-event-handler/

function getFolhaPHP(limite) {

    if (limite == undefined) {
        limite = 5;
    }

    let token_logado = localStorage.getItem('token_logado');

    callApi("GET", "folha", undefined, function(data) {

        const aDadosFolha = data;
        let body = document.querySelector(".containerTable-body");

        // limpa a tabela atual
        body.innerHTML = "";

        let contaFolha = 1;
        aDadosFolha.forEach(function(oFolha, key) {

            // lista apenas o limite de folhas
            if (contaFolha <= limite) {

                const dataFolha = oFolha.data;
                const tipoFolha = oFolha.tipo;
                const competenciaFolha = oFolha.competencia;
                const proventoFolha = oFolha.provento;
                const descontoFolha = oFolha.desconto;
                const liquidoFolha = oFolha.liquido;

                // Chama a tela de modal de detalhe da folha
                const details = `<td>
                                <button class="open-detalheFolhaPagamento" data-toggle="modal" data-id="22022" data-target="#modalFolhaPagamento">
                                <box-icon name='search-alt-2'></box-icon>
                                </button>
                            </td>`;

                // adiciona as colunas da tabela da consulta de folha de pagamento


                body.innerHTML += `<tr>
                                    <td>` + dataFolha + `</td>
                                    <td>` + tipoFolha + `</td>
                                    <td>` + competenciaFolha + `</td>
                                    <td>` + proventoFolha + `</td>
                                    <td>` + descontoFolha + `</td>
                                    <td>` + liquidoFolha + `</td>
                                    ` + details + `
                                </tr>`;
            }

            contaFolha++;
        });
    });
}

function getUrlBase(port) {
    if (port == undefined) {
        port = "ping";
    }

    // API PHP SLIM - PHP
    // return "https://apisenac2022.herokuapp.com/api-test-cors.php/" + port;

    // API JAVA - SPRING WEB API
    // return "https://cors-anywhere.herokuapp.com/https://spring-web-api-dio.herokuapp.com/" + port;

    // API JAVA - SPRING WEB API
    // return "https://cors-anywhere.herokuapp.com/https://web-api-java-gelvazio.herokuapp.com/" + port;

    // return "https://cors-anywhere.herokuapp.com/https://web-api-java-gelvazio.herokuapp.com/" + port;

    // folha
    //return "https://spring-web-api-dio.herokuapp.com/folha";

    // teste API JAVA LOCAL COM CORS
    //return "http://localhost:8080/folha";

    return "https://exercisedb.p.rapidapi.com/exercises/bodyPart/" + port;
}

function getHeaders() {
    return new Headers({
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type",
        "Access-Control-Max-Age": "86400",
        "HTTP_HOST": "apisenac2022.herokuapp.com",
        "Accept": "Application/json",
        "chave-api-dados": "15455",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "Application/json"
    });
}

function getMyInitFectahApi(method, body, headers) {
    let usaBody = false;
    if (method == "POST") {
        usaBody = true;
    }

    if (usaBody) {
        return {
            method: method,
            headers: headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body)
        };
    }

    return {
        method: method,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };
}

async function callApi(method, port, body, oCall, headers = false) {

    if(!headers){
        headers = getHeaders();
    }

    if (body == undefined) {
        body = "";
    }

    if (method == undefined) {
        method = "GET";
    }

    if (port == undefined) {
        port = "ping";
    }

    // Define a url
    const url = getUrlBase(port);

    console.log("url gerada:" + url);

    const myInit = getMyInitFectahApi(method, body, headers);

    const promise = await fetch(url, myInit)
        // Converting the response to a JSON object
        .then(response => response.json())
        .then(data => {
            console.log(data)

            //var data1 = JSON.stringify(data);

            //const dados = JSON.parse(data);

            if (oCall) {
                // Chama a function por parametor com os dados retornados...
                oCall(data);
            }

        })
        .catch(function(error) {
            console.log('There has been a ' +
                'problem with your fetch operation: ' + error.message);
        });
}
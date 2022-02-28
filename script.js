var data = [];

const busca = (url) => {
    var url = document.getElementById("nome").value;
    const promiseCallback = (resolve, reject) => {
        fetch(`https://api.github.com/orgs/${url}/repos?per_page=50&type=owner`)
            .then((response) => {
                if (!response.ok)
                    throw new Error("Error de requisição " + response.status);
                return response.json();
            })
            .then((resultado) => {
                data = resultado;
                data.forEach((elemento, posicao) => {
                    var divPrincipal = document.getElementById("div-principal");
                    var criarElemento = document.createElement("div");
                    criarElemento.id = posicao;
                    criarElemento.classList.add("box");
                    divPrincipal.appendChild(criarElemento);

                    document.getElementById(
                        posicao
                    ).innerHTML = `<p>Repositorio: <a href="${data[posicao].html_url}">${data[posicao].name}</a></p> <p>Exibição: ${data[posicao].visibility}</p><br>`;
                });
            })
            .catch((resultado) => {
                document.getElementById(
                    "error"
                ).innerHTML = `<p class="is-warning message is-medium">Repositorio não encontrado!</p>`;
            });
    };
    return new Promise(promiseCallback);
};

const filtrar = (filtro) => {
    var filtro = document.getElementById("filtro").value.toLowerCase().trim();

    data.forEach((elemento, posicao) => {
        var conteudo = data[posicao].name;
        var match = conteudo.toLowerCase().indexOf(filtro) >= 0;
        document.getElementById(posicao).style.display = match ? "" : "none";
    });
};

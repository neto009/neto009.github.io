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
                document.getElementById("div-principal").innerHTML = "";
                data.forEach((elemento, posicao) => {
                    var divPrincipal = document.getElementById("div-principal");
                    var criarElemento = document.createElement("div");
                    criarElemento.id = posicao;
                    criarElemento.classList.add("box");
                    divPrincipal.appendChild(criarElemento);

                    document.getElementById(
                        posicao
                    ).innerHTML = `<article class="media">
                            <div class="media-left">
                                <figure class="image is-64x64">
                                <img src="https://i.ibb.co/R29bg3k/Github.png" alt="Image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <p>Repositorio: <a href="${data[posicao].html_url}">${data[posicao].name}</a></p><p>Linguagem: ${data[posicao].language}</p> <p>Exibição: ${data[posicao].visibility}</p>
                                </div>
                            </div>
                        </article>`;
                });
                document.getElementById(
                    "tamanho"
                ).innerHTML = `<p class="tag is-success is-light">Foram encontrados ${data.length} repositórios!</p>`;
            })
            .catch((resultado) => {
                document.getElementById("div-principal").innerHTML = "";
                document.getElementById("tamanho").innerHTML = "";
                document.getElementById(
                    "div-principal"
                ).innerHTML = `<p class="message is-medium has-text-centered"><strong>Repositorio não encontrado!</strong></p>`;
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

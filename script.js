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
                document.getElementById("filtro").value = "";
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
                ).innerHTML = `<p class="tag is-success is-light is-large">Foram encontrados ${data.length} repositórios!</p>`;
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
    const numberItems = data.filter(
        (elemento) => elemento.name.toLowerCase().indexOf(filtro) >= 0
    );

    data.forEach((elemento, posicao) => {
        var conteudo = data[posicao].name;
        var match = conteudo.toLowerCase().indexOf(filtro) >= 0;
        document.getElementById(posicao).style.display = match ? "" : "none";
        document.getElementById(
            "tamanho"
        ).innerHTML = `<p class="tag is-success is-light is-large">Foram encontrados ${numberItems.length} repositórios!</p>`;
    });
};

const showMenu = () => {
    var burger = document.querySelector("#nav-burger");
    var menu = document.querySelector("#nav-menu");
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
};

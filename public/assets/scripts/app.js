const API_URL = "http://localhost:3000/artistas";

// LISTAR ARTISTAS NA INDEX
if (document.getElementById("listaArtistas")) {
  fetch(API_URL)
    .then(res => res.json())
    .then(artistas => {
      const container = document.getElementById("listaArtistas");
      container.innerHTML = artistas.map(artista => `
        <div class="col-md-4 mb-4">
          <div class="card shadow">
            <img src="${artista.imagem_principal}" class="card-img-top" alt="${artista.nome}">
            <div class="card-body">
              <h5>${artista.nome}</h5>
              <p>${artista.album}</p>
              <a href="detalhes.html?id=${artista.id}" class="btn btn-primary">Ver detalhes</a>
            </div>
          </div>
        </div>
      `).join("");
    });
}

// SLIDER DESTAQUES
if (document.getElementById("destaques")) {
  fetch(API_URL)
    .then(res => res.json())
    .then(artistas => {
      const destaques = artistas.filter(a => a.destaque);
      document.getElementById("destaques").innerHTML = destaques.map((artista, i) => `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img src="${artista.imagem_principal}" class="d-block w-100" alt="${artista.nome}">
          <div class="carousel-caption bg-dark bg-opacity-50 p-3 rounded">
            <h5>${artista.nome}</h5>
            <p>${artista.descricao}</p>
          </div>
        </div>
      `).join("");
    });
}

// DETALHES DO ARTISTA
if (document.getElementById("detalhesArtista")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(artista => {
      document.getElementById("detalhesArtista").innerHTML = `
        <h2>${artista.nome}</h2>
        <img src="${artista.imagem_principal}" class="img-fluid mb-3" alt="${artista.nome}">
        <p><strong>Álbum:</strong> ${artista.album}</p>
        <p>${artista.descricao}</p>
        <a href="cadastro_artista.html?id=${artista.id}" class="btn btn-warning">Editar</a>
        <button id="btnExcluir" class="btn btn-danger">Excluir</button>
      `;

      document.getElementById("btnExcluir").addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir este artista?")) {
          fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => window.location.href = "index.html");
        }
      });
    });
}

const dados = {
  artistas: [
    {
      id: 1,
      nome: "MC Ig",
      descricao: "Cantor e compositor de funk paulista, com diversos hits de sucesso.",
      album: "Favelado Chique (2024)",
      imagem_principal: "../assets/img/mcig.png",
      destaque: true,
      fotos: [
        { titulo: "Capa do Álbum", imagem: "../assets/img/capaalbummcig.jfif" },
        { titulo: "Show ao Vivo", imagem: "../assets/img/artista1.png" }
      ]
    },
    {
      id: 2,
      nome: "Henrique e Juliano",
      descricao: "Dupla sertaneja brasileira reconhecida nacionalmente.",
      album: "Manifesto Musical (2023)",
      imagem_principal: "../assets/img/henriqueejuliano.jfif",
      destaque: true,
      fotos: [
        { titulo: "Show em Goiânia", imagem: "../assets/img/henriqueejuliano.jfif" }
      ]
    },
    {
      id: 3,
      nome: "Artista Pop",
      descricao: "Novo talento da música pop nacional.",
      album: "Céu Aberto (2025)",
      imagem_principal: "../assets/img/artista1.png",
      destaque: false,
      fotos: [
        { titulo: "Capa do Álbum", imagem: "../assets/img/artista1.png" }
      ]
    }
  ]
};

// Renderizar artistas na index
if (document.getElementById("listaArtistas")) {
  const container = document.getElementById("listaArtistas");
  container.innerHTML = dados.artistas.map(artista => `
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
}

// Slider
if (document.getElementById("destaques")) {
  const destaques = dados.artistas.filter(a => a.destaque);
  document.getElementById("destaques").innerHTML = destaques.map((artista, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <img src="${artista.imagem_principal}" class="d-block w-100" alt="${artista.nome}">
      <div class="carousel-caption bg-dark bg-opacity-50 p-3 rounded">
        <h5>${artista.nome}</h5>
        <p>${artista.descricao}</p>
      </div>
    </div>
  `).join("");
}

// Página de detalhes
if (document.getElementById("detalhesArtista")) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const artista = dados.artistas.find(a => a.id === id);
  if (artista) {
    document.getElementById("detalhesArtista").innerHTML = `
      <h2>${artista.nome}</h2>
      <img src="${artista.imagem_principal}" class="img-fluid mb-3" alt="${artista.nome}">
      <p><strong>Álbum:</strong> ${artista.album}</p>
      <p>${artista.descricao}</p>
      <h4>Fotos</h4>
      <div class="row">
        ${artista.fotos.map(f => `
          <div class="col-md-4">
            <div class="card mb-3">
              <img src="${f.imagem}" class="card-img-top" alt="${f.titulo}">
              <div class="card-body text-center">
                <p>${f.titulo}</p>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }
}

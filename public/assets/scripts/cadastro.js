const API_URL = "http://localhost:3000/artistas";
const form = document.getElementById("formArtista");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(artista => {
      document.getElementById("nome").value = artista.nome;
      document.getElementById("album").value = artista.album;
      document.getElementById("descricao").value = artista.descricao;
      document.getElementById("imagem_principal").value = artista.imagem_principal;
      document.getElementById("destaque").checked = artista.destaque;
    });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const artista = {
    nome: form.nome.value,
    album: form.album.value,
    descricao: form.descricao.value,
    imagem_principal: form.imagem_principal.value,
    destaque: form.destaque.checked
  };

  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artista)
  })
  .then(() => window.location.href = "index.html");
});

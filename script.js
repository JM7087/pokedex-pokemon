// Função para buscar o Pokémon
function buscarPokemon() {
  let pokemonNameOuNumero = document
    .getElementById("characterName")
    .value.toLowerCase();

  const resultDiv = document.getElementById("result");

  if (pokemonNameOuNumero.trim() !== "") {

      resultDiv.innerHTML = `
        <div>
          <img src="img/carregando.gif" alt="Carregando...">
        </div>`;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOuNumero}`)
      .then((response) => response.json())
      .then((pokemonData) => {
        exibirPokemon(pokemonData);
      })
      .catch((error) => {
        resultDiv.innerHTML =
          "<p>Pokémon não encontrado. Verifique o nome e tente novamente.</p>";
        console.error("Erro:", error);
      });
  }

  // Função para exibir os detalhes do Pokémon
  function exibirPokemon(pokemonData) {
    const { name, height, weight, types, id } = pokemonData;
    const imagemGif =
      pokemonData.sprites.versions["generation-v"]["black-white"].animated
        .front_default;

    console.log(pokemonData);

    const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
          <h2>${name}</h2>
          <img src="${imagemGif}" alt="${name}">
          <p><strong>Altura:</strong> ${height} decímetros</p>
          <p><strong>Peso:</strong> ${weight} hectogramas</p>
          <p><strong>Tipo:</strong> ${types
            .map((type) => type.type.name)
            .join(", ")}</p>
          <p><strong>Numero:</strong> ${id}</p>
          <!-- Adicione outras informações que desejar -->
        `;
  }
}

// Ouvinte de evento para o botão "Buscar"
document
  .querySelector(".search-container button")
  .addEventListener("click", buscarPokemon);

// Ouvinte de evento para a tecla "Enter"
document
  .getElementById("characterName")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      buscarPokemon();
    }
  });
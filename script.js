//DOM Call
const input = document.getElementById('pokemon-input');
const searchBtn = document.getElementById('search-btn');
const mainScreen = document.getElementById('main-screen');
const recommendationsContainer = document.getElementById('recommendations');
const historyContainer = document.getElementById('history');
const clearHistoryBtn = document.getElementById('clear-history');
const refreshRecommendationsBtn = document.getElementById('refresh-recommendations');

<<<<<<< HEAD

=======
// Données
let searchHistory = JSON.parse(localStorage.getItem('pokemonHistory')) || [];
const TOTAL_POKEMON = 1025; // Nombre total de Pokémon dans l'API

// Couleurs des types
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

// Générer des IDs aléatoires uniques
function getRandomPokemonIds(count) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * TOTAL_POKEMON) + 1);
  }
  return Array.from(ids);
}

// Initialisation
init();

function init() {
  loadRecommendations();
  displayHistory();
  
  searchBtn.addEventListener('click', handleSearch);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  clearHistoryBtn.addEventListener('click', clearHistory);
  refreshRecommendationsBtn.addEventListener('click', loadRecommendations);
}

// Recherche de Pokémon
async function handleSearch() {
  const query = input.value.trim().toLowerCase();
  if (!query) return;
  
  await fetchPokemon(query);
}

async function fetchPokemon(query) {
  showLoading();
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    
    if (!response.ok) {
      throw new Error('Pokémon non trouvé');
    }
    
    const data = await response.json();
    displayPokemon(data);
    addToHistory(data);
    
  } catch (error) {
    showError(error.message);
  }
}

function showLoading() {
  mainScreen.innerHTML = '<div class="loading">Chargement</div>';
}

function showError(message) {
  mainScreen.innerHTML = `<div class="error-message">⚠️ ${message}</div>`;
}

function displayPokemon(pokemon) {
  const id = String(pokemon.id).padStart(3, '0');
  const name = pokemon.name;
  const image = pokemon.sprites.other['official-artwork'].front_default || 
                pokemon.sprites.front_default;
  const types = pokemon.types.map(t => t.type.name);
  const stats = pokemon.stats;
  
  mainScreen.innerHTML = `
    <div class="pokemon-display">
      <div class="pokemon-header">
        <h2>${name}</h2>
        <span class="pokemon-id">#${id}</span>
      </div>
      
      <div class="pokemon-image">
        <img src="${image}" alt="${name}" />
      </div>
      
      <div class="pokemon-types">
        ${types.map(type => `
          <span class="type-badge" style="color: ${typeColors[type] || '#999'}">
            ${type}
          </span>
        `).join('')}
      </div>
      
      <div class="pokemon-stats">
        ${stats.map(stat => `
          <div class="stat-row">
            <span class="stat-name">${formatStatName(stat.stat.name)}</span>
            <span class="stat-value">${stat.base_stat}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function formatStatName(name) {
  const statNames = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SP.ATK',
    'special-defense': 'SP.DEF',
    'speed': 'SPD'
  };
  return statNames[name] || name;
}


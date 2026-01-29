//DOM Call
const input = document.getElementById('pokemon-input');
const searchBtn = document.getElementById('search-btn');
const mainScreen = document.getElementById('main-screen');
const recommendationsContainer = document.getElementById('recommendations');
const historyContainer = document.getElementById('history');
const clearHistoryBtn = document.getElementById('clear-history');
const refreshRecommendationsBtn = document.getElementById('refresh-recommendations');

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

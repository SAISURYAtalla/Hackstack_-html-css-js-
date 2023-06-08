const API_KEY = '0f403c7e87bb9285f919447a42f8d565';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

const searchInput = document.getElementById('searchInput');
const movieList = document.getElementById('movieList');

let movies = [];

function fetchMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      movies = data.results;
      displayMovies(movies);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}// this function will fetch data from the website 

function displayMovies(movies) {
  movieList.innerHTML = '';

  if (movies.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No movies found.';
    movieList.appendChild(noResultsMessage);
    return;
  }

  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    movieList.appendChild(movieElement);
  });
}//this function will display the fetched data on the screen

function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');

  const img = document.createElement('img');
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = movie.title;
  movieElement.appendChild(img);

  const h2 = document.createElement('h2');
  h2.textContent = movie.title;
  movieElement.appendChild(h2);

  const p = document.createElement('p');
  p.textContent = movie.overview;
  movieElement.appendChild(p);

  return movieElement;
}//this function will create every movie into an HTML element to make the search functionality

searchInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  displayMovies(filteredMovies);
});//this will enable the search functionality

fetchMovies(API_URL); //fecth API command

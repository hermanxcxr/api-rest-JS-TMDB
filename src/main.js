const API_URL = 'https://api.themoviedb.org/3';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  params: {
  }
});


//Utils
function movieList(section, movies) {

  section.innerHTML = '';

  movies.forEach(movie => {
    
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

    movieContainer.appendChild(movieImg);
    section.appendChild(movieContainer);
      
  });
}

function categoriesList(section, genres) {

  section.innerHTML = '';

  genres.forEach(genre => {
    
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + genre.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${genre.id}-${genre.name}`;
    });
    const categoryTitleText = document.createTextNode(genre.name);
    categoryTitle.appendChild(categoryTitleText);

    categoryContainer.appendChild(categoryTitle);
    section.appendChild(categoryContainer);
      
  });

}


//Llamados a la API
async function getTrendingMoviesPreview() {
  const { data } = await api(`/trending/movie/day?language=es`);  

  const movies = data.results;

  movieList(trendingMoviesPreviewList, movies)

}


async function getCategoriesPreview() {
  const { data }= await api(`genre/movie/list?language=es`);

  const genres = data.genres;
  
  categoriesList(categoriesPreviewList, genres);  
}


async function getMoviesByCategory(categoryId) {  
  const { data } = await api('/discover/movie', {
  params: {
    language: 'es',
    with_genres: categoryId
    }
  }); 

  const movies = data.results;

  movieList(genericSection, movies);
}

async function getMoviesBySearch(query) {
  const { data } = await api('/search/movie', {
    params: {
      language: 'es',
      query,
    }
  });
  
  const movies = data.results;
  movieList(genericSection, movies);
}

async function getTrendingMovies() {
  const { data } = await api(`/trending/movie/day?language=es`);  

  const movies = data.results;

  movieList(genericSection, movies)

}
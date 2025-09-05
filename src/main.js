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

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {    
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img');
      entry.target.setAttribute('src', url);
    }
  });
});

function movieList(section, movies, { lazyLoad=false, clean=true }) {

  if (clean){
    section.innerHTML = '';
  }

  movies.forEach(movie => {
    
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    //movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    movieImg.setAttribute( lazyLoad ? 'data-img' : 'src' , `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    movieImg.addEventListener('error', () => {
      movieImg.setAttribute('src', 'static/images/img404.png');
    });

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

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

  movieList(trendingMoviesPreviewList, movies, {lazyLoad : true, clean : true})

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

  movieList(genericSection, movies,  {lazyLoad : true, clean : true});
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
  maxPage = data.total_pages;

  movieList(genericSection, movies,{lazyLoad : true, clean : true})

  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.innerText = 'Cargar más';
  // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
  // genericSection.appendChild(btnLoadMore);

}

async function getPaginatedTrendingMovies() {

  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15

  const pageIsNotMax = page < maxPage

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api(`/trending/movie/day`,
      { params: {
          language: 'es',
          page
        }
    });  

    const movies = data.results;

    movieList(genericSection, movies, {lazyLoad : true, clean : false})
  }

  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.innerText = 'Cargar más';
  // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
  // genericSection.appendChild(btnLoadMore);

}


async function getMovieById(movieId) {
  const { data : movie } = await api(`movie/${movieId}`, {
    params: {
      language: 'es',
    }
  });
  
  const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  headerSection.style.background = `
    linear-gradient(180deg, rgba(0,0,0,0.35) 19.27%, rgba(0,0,0,0) 29.17%),
    url(${movieImgUrl})
  `;

  movieDetailDescription.textContent = movie.overview;
  movieDetailTitle.textContent = movie.title;
  movieDetailScore.textContent = movie.vote_average;

  categoriesList(movieDetailCategoriesList, movie.genres);

  getRelatedMoviesById(movieId);
}

async function getRelatedMoviesById(movieId) {
  const { data } = await api(`movie/${movieId}/recommendations`, {
      params: {
        language: 'es',
      } 
  });

  const movies = data.results;  

  movieList(relatedMoviesContainer, movies);
}
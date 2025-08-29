const API_URL = 'https://api.themoviedb.org/3';

async function getTrendingMoviesPreview() {
  const res = await fetch(`${API_URL}/trending/movie/day?language=es`, {headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
    }
  });        
  const data = await res.json();

  const movies = data.results;
  //console.log({data, movies});

  movies.forEach(movie => {
      
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
    
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
      
  });
}


async function getCategoriesPreview() {
  const res = await fetch(`${API_URL}/genre/movie/list?language=es`, {headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
    }
  });        
  const data = await res.json();

  const genres = data.genres;
  //console.log({data, movies});

  genres.forEach(genre => {
      
    const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + genre.id);    
    const categoryTitleText = document.createTextNode(genre.name);
    categoryTitle.appendChild(categoryTitleText);

    categoryContainer.appendChild(categoryTitle);
    previewCategoriesContainer.appendChild(categoryContainer);
      
  });
}


getTrendingMoviesPreview();
getCategoriesPreview();

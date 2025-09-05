let page= 1;
let infiniteScroll;
let maxPage;

searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value.trim()}`;
})
trendingBtn.addEventListener('click', () => {
    location.hash = `#trends=`;
})
arrowBtn.addEventListener('click', () => {
    history.back(); // Regresa a la página anterior
    //location.hash = `#home`;
});


window.addEventListener('DOMContentLoaded', navigator, false); // Cuando el DOM esté listo, se deja en false para que no se active hasta que se asigne una función
window.addEventListener('hashchange', navigator, false); // Cuando cambie el hash, se deja en false para que no se active hasta que se asigne una función
window.addEventListener('scroll', infiniteScroll,false); // se deja en false para que no se active hasta que se asigne una función

function navigator() {
    console.log({location});

    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll,{passive:false});
        infiniteScroll = undefined;
    }

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    }else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll,{passive:false});        
    }
}

function homePage() {
    console.log('Home');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage() {
    console.log('trends');

    headerSection.classList.remove('header-container--long');    
    headerSection.style.background = '';    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();
    infiniteScroll = getPaginatedTrendingMovies;

}

function searchPage() {
    console.log('search');

    headerSection.classList.remove('header-container--long');    
    headerSection.style.background = '';    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, searchValue] = location.hash.split('='); // ['#search', 'búsqueda']
    getMoviesBySearch(searchValue);
}

function movieDetailsPage() {
    console.log('movie');

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('='); // ['#movie', 'id']
    getMovieById(movieId);
}

function categoryPage() {
    console.log('category');

    headerSection.classList.remove('header-container--long');    
    headerSection.style.background = '';    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('='); // ['#category', 'id-name']
    const [categoryId, categoryName] = categoryData.split('-'); // ['id', 'name']

    headerCategoryTitle.innerHTML = decodeURIComponent(categoryName);

    getMoviesByCategory(categoryId);
}
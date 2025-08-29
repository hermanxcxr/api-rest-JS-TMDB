window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});
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
}

function homePage() {
    console.log('Home');
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage() {
    console.log('trends');
}

function searchPage() {
    console.log('search');
}

function movieDetailsPage() {
    console.log('movie');
}

function categoryPage() {
    console.log('category');
}
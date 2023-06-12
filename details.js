const apiKey = 'e9f906b1';
const resultDiv = document.getElementById('result');
const addToWatchlistButton = document.getElementById('add-to-watchlist');
const removeFromWatchlistButton = document.getElementById('remove-from-watchlist');

const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

// sprawdzenie czy film znajduje się już w watchliście
function isMovieInWatchlist(movieId) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    return watchlist.some((item) => item.id === movieId);
}

// zamiana przycisków
function updateWatchlistButtons() {
    if (isMovieInWatchlist(imdbID)) {
        addToWatchlistButton.style.display = 'none';
        removeFromWatchlistButton.style.display = 'block';
    } else {
        addToWatchlistButton.style.display = 'block';
        removeFromWatchlistButton.style.display = 'none';
    }
}

// dodawanie filmów do watchlisty
function addToWatchlist() {
    let urlMovie = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    fetch(urlMovie)
        .then((resp) => resp.json())
        .then((data) => {
            const movieName = data.Title;
            const moviePoster = data.Poster;
            const movieId = data.imdbID;

            let watchlist = localStorage.getItem('watchlist');
            if (!watchlist) {
                watchlist = [];
            } else {
                watchlist = JSON.parse(watchlist);
            }

            if (isMovieInWatchlist(movieId)) {
                return;
            } else {
                watchlist.push({
                    name: movieName,
                    poster: moviePoster,
                    id: movieId
                });
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                updateWatchlistButtons();
            }
        });
}

// wyświetlanie detalów filmu
function getMovie(imdbID) {
    let urlMovie = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    fetch(urlMovie)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.Response == "True") {
                resultDiv.innerHTML = `
                    <div class="info"> 
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").slice(0, 3).join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            } else {
                resultDiv.innerHTML = `<h3 class="msg"> ${data.Error}</h3>`;
            }
        })
        .catch(() => {
            resultDiv.innerHTML = `<h3 class="msg"> Error Occurred</h3>`;
        });
}

// dodawanie filmu do watchlisty
addToWatchlistButton.addEventListener('click', () => {
    addToWatchlist();
});

// usuwanie filmu z watchlisty
removeFromWatchlistButton.addEventListener('click', () => {
    const movieId = imdbID;

    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter((item) => item.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    updateWatchlistButtons();
});

// działanie paska wyszukiwania
const searchButton = document.getElementById('search-btn');
const movieNameInput = document.getElementById('movie-name');
const yearInput = document.getElementById('year');
const typeInput = document.getElementById('type');

searchButton.addEventListener('click', () => {
    const movieName = movieNameInput.value;
    const year = yearInput.value;
    const type = typeInput.value;

    const url = `results.html?movieName=${encodeURIComponent(movieName)}&year=${encodeURIComponent(year)}&type=${encodeURIComponent(type)}`;

    window.location.href = url;
});

// pobranie danych filmu i aktualizacja przycisków
getMovie(imdbID);
updateWatchlistButtons();

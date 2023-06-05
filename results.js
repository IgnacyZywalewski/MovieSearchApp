const apiKey = 'e9f906b1';
const resultDiv = document.getElementById('result');
const backButton = document.getElementById('back-btn');
const nextButton = document.getElementById('next-btn');
let page = 1;

let searchResult = (movieName, year, type) => {
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieName)}&y=${encodeURIComponent(year)}&type=${encodeURIComponent(type)}&page=${page}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = '';

            if (data.Response === 'True') {
                const moviesContainer = document.createElement('div');
                moviesContainer.classList.add('movies-container');

                data.Search.forEach(movie => {
                    const movieDiv = document.createElement('div');
                    movieDiv.classList.add('movie-item');

                    const poster = document.createElement('img');
                    poster.src = movie.Poster;
                    poster.classList.add('movie-poster');
                    movieDiv.appendChild(poster);

                    const title = document.createElement('h4');
                    title.textContent = movie.Title;
                    title.addEventListener('click', (event) => {
                        event.preventDefault();
                        goToDetailsPage(movie.imdbID);
                    });
                    title.classList.add('movie-title');
                    movieDiv.appendChild(title);

                    const year = document.createElement('p');
                    year.textContent = `Year: ${movie.Year}`;
                    movieDiv.appendChild(year);

                    const type = document.createElement('p');
                    type.textContent = `Type: ${movie.Type}`;
                    movieDiv.appendChild(type);

                    moviesContainer.appendChild(movieDiv);
                });

                resultDiv.appendChild(moviesContainer);
            }

            else {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'No results found.';
                resultDiv.appendChild(errorMessage);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
};

const goToDetailsPage = (imdbID) => {
    const detailsUrl = `details.html?imdbID=${encodeURIComponent(imdbID)}`;
    window.location.href = detailsUrl;
};

const urlParams = new URLSearchParams(window.location.search);
const movieName = urlParams.get('movieName');
const year = urlParams.get('year');
const type = urlParams.get('type');
const currentPage = urlParams.get('page');

if (currentPage) {
    page = parseInt(currentPage);
}

const onPageLoad = () => {
    searchResult(movieName, year, type);

    if (page <= 1) {
        backButton.disabled = true;
    }
    else {
        backButton.addEventListener('click', () => {
            const nextPage = page - 1;
            const nextUrl = `results.html?movieName=${encodeURIComponent(movieName)}&year=${encodeURIComponent(
                year
            )}&type=${encodeURIComponent(type)}&page=${nextPage}`;
            window.location.href = nextUrl;
        });
    }

    nextButton.addEventListener('click', () => {
        const nextPage = page + 1;
        const nextUrl = `results.html?movieName=${encodeURIComponent(movieName)}&year=${encodeURIComponent(
            year
        )}&type=${encodeURIComponent(type)}&page=${nextPage}`;
        window.location.href = nextUrl;
    });
};
window.addEventListener('load', onPageLoad);
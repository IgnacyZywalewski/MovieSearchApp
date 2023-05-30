const apiKey = 'e9f906b1';
const movieNameRef = document.getElementById('movie-name');
const yearRef = document.getElementById('year');
const typeRef = document.getElementById('type');
const searchButton = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');
let page = 1;

let searchResult = (event) => {
    event.preventDefault();

    const movieName = movieNameRef.value;
    const year = yearRef.value;
    const type = typeRef.value;

    let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}&y=${year}&type=${type}&page=${page}`;

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
                        getMovie(movie.imdbID);
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


let getMovie = (imdbID) => {

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
            resultDiv.innerHTML = `<h3 class="msg"> Error Occured</h3>`;
        });
};

searchButton.addEventListener('click', searchResult);
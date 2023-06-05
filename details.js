const apiKey = 'e9f906b1';
const resultDiv = document.getElementById('result');

const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');



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

getMovie(imdbID);
const apiKey = 'e9f906b1';
const movieNameRef = document.getElementById('movie-name');
const yearRef = document.getElementById('year');
const typeRef = document.getElementById('type');
const searchButton = document.getElementById('search-btn');

let searchResult = (event) => {
    event.preventDefault();

    const movieName = movieNameRef.value;
    const year = yearRef.value;
    const type = typeRef.value;

    window.location.href = `results.html?movieName=${encodeURIComponent(movieName)}&year=${encodeURIComponent(year)}&type=${encodeURIComponent(type)}`;
};

searchButton.addEventListener('click', searchResult);
const watchlistTable = document.getElementById('watchlist-table');
const clearButton = document.getElementById('clear-watchlist');

//tworzenie tabeli
function renderWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlistTable.innerHTML = '';

    watchlist.forEach((item, index) => {
        const row = watchlistTable.insertRow();
        const posterCell = row.insertCell();
        const nameCell = row.insertCell();
        const buttonCell = row.insertCell();

        posterCell.classList.add('row-cell');
        nameCell.classList.add('row-cell');
        buttonCell.classList.add('row-cell');

        const posterImg = document.createElement('img');
        posterImg.src = item.poster;
        posterImg.alt = item.name;
        posterImg.alt = item.id;
        posterCell.appendChild(posterImg);

        const nameText = document.createTextNode(item.name);
        nameCell.appendChild(nameText);
        nameCell.addEventListener('click', () => {
            window.location.href = `details.html?imdbID=${encodeURIComponent(item.id)}`;
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.id = 'remove-button';
        removeButton.addEventListener('click', () => {
            watchlist.splice(index, 1);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            renderWatchlist();
        });
        buttonCell.appendChild(removeButton);
    });
}

//przycisk czyszczenia tabeli
clearButton.addEventListener('click', () => {
    localStorage.removeItem('watchlist');
    renderWatchlist();
});

renderWatchlist();

//działanie paska wyszukiwań
const searchButtonWatchlist = document.getElementById('search-btn');
const movieNameInputWatchlist = document.getElementById('movie-name');
const yearInputWatchlist = document.getElementById('year');
const typeInputWatchlist = document.getElementById('type');

searchButtonWatchlist.addEventListener('click', () => {
    const movieName = movieNameInputWatchlist.value;
    const year = yearInputWatchlist.value;
    const type = typeInputWatchlist.value;

    const url = `results.html?movieName=${encodeURIComponent(movieName)}&year=${encodeURIComponent(year)}&type=${encodeURIComponent(type)}`;

    window.location.href = url;
});
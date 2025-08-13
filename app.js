// GRABBING ELEMENTS FROM HTML
const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".searchName");

// GLOBAL MOVIES VARIABLE
let currentMovies = [];

// HANDLING THE SEARCH
function searchChange(event) {
  renderMovies(event.target.value);
  searchName.innerHTML = event.target.value;
}

// RENDERING MOVIES / CALLING API
async function renderMovies(searchTerm) {
  try {
    const response = await fetch(
      `https://omdbapi.com/?s=${searchTerm}&apikey=c5882ffb`
    );
    const data = await response.json();

    // Check if API returned an error or no results
    if (data.Response === "False" || !data.Search) {
      displayErrorMessage();
      currentMovies = [];
      return;
    }

    currentMovies = data.Search.slice(0, 6);
    displayMovies(currentMovies);
  } catch (error) {
    // Handle network errors or other fetch issues
    displayErrorMessage();
    currentMovies = [];
  }
}

// DISPLAYING ERROR MESSAGE
function displayErrorMessage() {
  moviesWrapper.innerHTML = `
    <div class="movie__night--wrapper">
      <div
        class="movie__night--img error-img"
      >
        ⚠️
      </div>
      <p class="movie__night--title">
        <span style="color: #ff3232;">Oops!</span> Something went wrong
      </p>
      <p class="movie__night--subtitle">
        We couldn't find any movies matching your search...
      </p>
    </div>
  `;
}

// DISPLAYING MOVIES
function displayMovies(movieList) {
  moviesWrapper.innerHTML = movieList
    .map((movie) => {
      return `
      <div class="movie">
      <img src=${movie.Poster} alt="" />
      <h2>${movie.Title}</h2>
      <h4>${movie.Year}</h4>
      <button>Learn More</button>
      </div>
      `;
    })
    .join("");
}

// SORTING MOVIES
function sortChange(event) {
  const sortOption = event.target.value;

  let sortedMovies = [...currentMovies];

  if (sortOption === "newest") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  } else if (sortOption === "oldest") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  }

  displayMovies(sortedMovies);
}

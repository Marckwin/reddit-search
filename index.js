// Importing the redditapi module
import reddit from "./redditapi";
// Assigning variables for the search form and search input
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Adding an event listener to the form to handle submission of the search
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
// Getting the search term
const searchTerm = searchInput.value;
// Getting the sort preference selected by the user
const sortBy = document.querySelector('input[name="sortby"]:checked').value;
// Getting the limit preference selected by the user
const searchLimit = document.getElementById("limit").value;
// Checking if the search term is empty
if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }
// Clearing the search input after the search is executed
searchInput.value = "";
// Using the redditapi module to search for posts

  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    let output = '<div class="card-columns">';
    // loop through post
    results.forEach((post) => {

      output += `<div class="card">
     <div class="card-body">
  
      <h5 class="card-title">${post.title}</h5>
  
      <p class="card-text">${truncateText(post.selftext, 100)}</p>
  
      <a href="${post.url}" target="_blank" class="btn btn-dark">Read More</a> 
    </div>
  </div>`;
    });
    output += "</div>";
    // Inserting the output into the results div
    document.getElementById("results").innerHTML = output;
  });
});
// truncate text
function truncateText(text,limit){
    // checking if the text is longer than the limit
    const shortened =text.indexOf('', limit);
    // if the text is longer than the limit, return the text up to the limit
    if(shortened ==-1)return text;
    // if the text is shorter than the limit, return the text
    return text.substring(0, shortened);
}
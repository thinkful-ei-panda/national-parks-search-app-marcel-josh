'use strict';

// put your own value below!
const apiKey = 'q2pECW00QrY65siDxAeVrkKUgNjQXsxNN8n6cEsm'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults (responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate thru the items array
  for (let i = 0; i < responseJson.data.length; i++) {
    // for each park object in the items
    // array, add a list item to the results
    // list with fullName, description, url
    $('#results-list').append(` 
      <li>
      <h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
      </li> 
      `);
    // display the results section
    $('#results').removeClass('hidden');
  }
};

function getParks (query, maxResults=10) {
  const params = {
    api_Key: apiKey,
    q: query,
    limit: maxResults
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    // console.log(searchTerm);
    // console.log(maxResults);
    getParks(searchTerm, maxResults);
  });
  
}

$(watchForm);
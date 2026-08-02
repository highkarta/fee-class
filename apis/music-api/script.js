const searchBtn = document.getElementById('searchBtn');
const artistInput = document.getElementById('artistInput');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');

artistInput.addEventListener('keydown', function(e){
  if(e.key === 'Enter'){
    handleSearch();
  }
})

searchBtn.addEventListener('click', () => {
  handleSearch();
});

function handleSearch(){ // this acts like a helper function without you having to duplicate query in both the artistInput and searchBtn event listeners
  const query = artistInput.value.trim();
  if (!query) return;
  fetchArtistData(query);
}

async function fetchArtistData(artistName) {
  loadingDiv.classList.remove('hidden');
  resultsDiv.innerHTML = '';

  try {
    // 1. Search for artist by name
    const searchUrl = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json`; // encodeURIComponent is a keyword that allows the string you use as query to meet the safety and syntax standards for a url
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.artists || data.artists.length === 0) {
      resultsDiv.innerHTML = '<p>No artist found!</p>';
      loadingDiv.classList.add('hidden');
      return;
    }

    const artist = data.artists[0]; // Pick the top matching artist
    
    // 2. Render basic artist info
    resultsDiv.innerHTML = `
      <div class="card">
        <h2>${artist.name}</h2>
        <p><strong>Type:</strong> ${artist.type || 'N/A'}</p>
        <p><strong>Country / Origin:</strong> ${artist.country || 'N/A'}</p>
        <p><strong>Description:</strong> ${artist.disambiguation || 'No description available'}</p>
      </div>
    `;

  } catch (error) {
    console.error('API Error:', error);
    resultsDiv.innerHTML = '<p>Something went wrong trying to fetch data.</p>';
  } finally {
    // 3. Remove the div back
    loadingDiv.classList.add('hidden');
  }
}
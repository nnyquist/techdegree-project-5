//
// DOCUMENT OBJECTS
//
const gallery = document.getElementById('gallery');

//
// FETCH
//
fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(data => renderGallery(data.results));

//
// EVENTS
//


//
// FUNCTIONS
//
function renderGallery(data) {
  data.forEach(item => {
    const fName = item.name.first;
    const lName = item.name.last;
    const email = item.email;
    const state = item.location.state;
    const loc = item.location.city;
    const thumbnail = item.picture.thumbnail;

    // string literal to insert the info
    const galleryContent = `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${thumbnail}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${fName} ${lName}</h3>
              <p class="card-text">${email}</p>
              <p class="card-text cap">${loc}, ${state}</p>
          </div>
      </div>
    `;

    // append to gallery id
    gallery.innerHTML += galleryContent;
  })
}

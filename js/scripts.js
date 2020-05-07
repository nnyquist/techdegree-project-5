//
// DOCUMENT OBJECTS
//
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
var cards;
// modal document objects
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
modalContainer.hidden = true;
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
  `;
const modalInfoContainer = document.createElement('div');
modalInfoContainer.className = 'modal-info-container'
modal.appendChild(modalInfoContainer);
modalContainer.appendChild(modal);

// add to the document
body.appendChild(modalContainer);

//
// FETCH
//
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(checkStatus)
  .then(response => response.json())
  .catch(error => console.log('A problem arose:', error))
  .then( data => {
    renderGallery(data.results);
    cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', e => {
        const target = e.currentTarget;
        renderModal(extractCardNumber(target));
      })
    })
    // return array of results for use in Modal portion
    return fetchResults = data.results;
  })

//
// EVENTS
//
document.querySelector('#modal-close-btn').addEventListener('click', e => {
  modalContainer.hidden = true;
});
//
// FUNCTIONS
//
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function renderGallery(results) {
  results.forEach((item, i) => {
    // grab the data from the request
    const fName = item.name.first;
    const lName = item.name.last;
    const email = item.email;
    const state = item.location.state;
    const loc = item.location.city;
    const thumbnail = item.picture.medium;

    // string literal to insert the info
    const galleryContent = `
      <div class="card" id="card-${i}">
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

  });

}

function extractCardNumber(target) {
  return Number(target.getAttribute('id').replace('card-',''))
}

function formatDate(dateString){
  const date = new Date(dateString);
  var month = date.getMonth();
  var year = date.getFullYear();
  var day = date.getDate();

  return month + '/' + day + '/' + year;
}

function renderModal(cardNumber){
  // identify the array object to populate the fields
  const item = fetchResults[cardNumber];

  // grab the data to populate the modal portion
  const fName = item.name.first;
  const lName = item.name.last;
  const email = item.email;
  const state = item.location.state;
  const loc = item.location.city;
  const addr = item.location.street.number + ' ' + item.location.street.name;
  const zip = item.location.postcode;
  const thumbnail = item.picture.large;
  const cell = item.cell;
  const dob = formatDate(item.dob.date);
  
  // string literal to insert modal info
  const modalContent = `
    <img class="modal-img" src="${thumbnail}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${fName} ${lName}</h3>
    <p class="modal-text">${email}</p>
    <p class="modal-text cap">${loc}</p>
    <hr>
    <p class="modal-text">${cell}</p>
    <p class="modal-text">${addr}, ${loc}, ${state} ${zip}</p>
    <p class="modal-text">Birthday: ${dob}</p>
  `;

  // add to the document
  modalInfoContainer.innerHTML = modalContent;

  // unhide the modal Container
  modalContainer.hidden = false;
}

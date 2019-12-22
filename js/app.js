/* ======================================================================
UI Elements
======================================================================*/
const body = document.querySelector('body');
const filter = document.querySelector('.header__filter');
const board = document.querySelector('.board');
const modal = document.querySelector('.modal');



/* ======================================================================
Event Listeners
======================================================================*/
body.addEventListener('keydown', processModalKeyPress);
filter.addEventListener('keyup', filterEmployees);
board.addEventListener('click', openModal);
modal.addEventListener('click', processModalClick);



/* ======================================================================
Controllers
======================================================================*/
let userData;



/* ======================================================================
Logic
======================================================================*/
function getUserData() {
  fetch('https://randomuser.me/api/?results=12')
    .then((response) => response.json())
    .then((usersJSON) => {
      const users = usersJSON.results;
      userData = users;

      // Reset Board content
      board.innerHTML = '';
      let boardContent = '';
      for (let i = 0; i < users.length; i++) {
        // Generate Tile HTML
        const tileHTML = `
            <div class="tile" id="${i}">
              <img src="${users[i].picture.large}" alt="${users[i].name.first} ${users[i].name.last} profile picture" class="tile__image">
              <div class="tile__text">
                <h2 class="tile__name">${users[i].name.first} ${users[i].name.last}</h2>
                <p class="tile__email">${users[i].email}</p>
                <p class="tile__location">${users[i].location.city}, ${users[i].location.state}, ${users[i].location.country}</p>
              </div>
            </div>
            `;
        // Add Tile to Board HTML
        boardContent += tileHTML;
      }
      return boardContent;
    })
    .then((boardHTML) => {
      // Add tiles HTML to the DOM
      board.innerHTML = boardHTML;
    })
    .catch((error) => {
      console.log(`Error: could not retrieve user data from database`);
      console.log(error);
    });
}
getUserData();

function processModalClick(e) {
  if (e.target.classList.value.includes('modal__button-close-icon') ||
    e.target.classList.value.includes('modal__button-close') || e.target.classList.value === 'modal') {
    closeModal(e);
  } else if (e.target.classList.value.includes('modal__button-previous')) {
    showPrevious(e);
  } else if (e.target.classList.value.includes('modal__button-next')) {
    showNext(e);
  }
}

function processModalKeyPress(e) {
  if (e.code === 'ArrowLeft') {
    showPrevious(e);
  } else if (e.code === 'ArrowRight') {
    showNext(e);
  }
}

function getUserId(clickedElement) {
  if (clickedElement.className === "tile") {
    return clickedElement.id;
  } else if (clickedElement.parentElement.className === 'tile') {
    return clickedElement.parentElement.id;
  } else if (clickedElement.parentElement.className === 'tile__text') {
    return clickedElement.parentElement.parentElement.id;
  }
}

function getModalContent(userData, tileId) {
  const userDob = new Date(userData.dob.date).toLocaleDateString();

  const modalContent = `
  <div class="modal__window" id="${tileId}">
    <i class="fas fa-chevron-left modal__button-previous"></i>
    <div class="modal__content">
  <button class="modal__button-close"><i class="fas fa-times modal__button-close-icon"></i></button>
    <img src="${userData.picture.large}" alt="Image of ${userData.name.first} ${userData.name.last}" class="modal__image">
    <h2 class="modal__name">${userData.name.first} ${userData.name.last}</h2>
    <p class="modal__email">${userData.email}</p>
    <p class="modal__location">${userData.location.city}, ${userData.location.state}, ${userData.location.country}</p>
    <hr class="modal__hr">
    <p class="modal__telephone">Cell Number: ${userData.cell}</p>
    <p class="modal__address"> Address: ${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city} ${userData.location.state} ${userData.location.postcode} ${userData.location.country}</p>
    <p class="modal__birthday">Birthday: ${userDob}</p>
  </div>
  <i class="fas fa-chevron-right modal__button-next"></i>
  </div>
  `;

  return modalContent;
}

function openModal(e) {
  const tileId = getUserId(e.target);
  const clickedUserData = userData[tileId];

  // Render modal content
  const modalContent = getModalContent(clickedUserData, tileId);
  modal.innerHTML = modalContent;

  // Display modal window
  modal.style.display = 'flex';
}

function closeModal(e) {
  modal.style.display = 'none';
}

function showPrevious(e) {
  // Set previous tile id
  const previousButton = document.querySelector('.modal__button-previous');
  const currentTileId = parseInt(previousButton.parentElement.id);
  let previousTileId;
  if (currentTileId > 0) {
    previousTileId = currentTileId - 1;
  } else if (currentTileId === 0) {
    previousTileId = 11;
  }

  // Get previous tile content
  const previousModalContent = getModalContent(userData[previousTileId], previousTileId);

  // Render previous tile modal
  modal.innerHTML = previousModalContent;
}

function showNext(e) {
  // Set next tile id
  const previousButton = document.querySelector('.modal__button-next');
  const currentTileId = parseInt(previousButton.parentElement.id);
  let nextTileId;
  if (currentTileId < 11) {
    nextTileId = currentTileId + 1;
  } else if (currentTileId === 11) {
    nextTileId = 0;
  }

  // Get next tile content
  const nextModalContent = getModalContent(userData[nextTileId], nextTileId);

  // Render previous tile modal
  modal.innerHTML = nextModalContent;
}

function filterEmployees(e) {
  // Get value of filter field
  const text = e.target.value.toLowerCase();
  console.log(text);
  // Get all tiles
  const tiles = document.querySelectorAll('.tile');
  // Render tiles using filter text
  tiles.forEach((tile) => {
    console.log(tile);
    const name = tile.lastElementChild.firstElementChild.textContent.toLowerCase();
    console.log(name);
    if (name.indexOf(text) != -1) {
      tile.style.display = 'flex';
    } else {
      tile.style.display = 'none';
    }
  });
}
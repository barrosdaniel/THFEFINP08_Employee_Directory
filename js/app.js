/* ======================================================================
UI Elements
======================================================================*/
const board = document.querySelector('.board');
const modal = document.querySelector('.modal');



/* ======================================================================
Event Listeners
======================================================================*/
board.addEventListener('click', openModal);
modal.addEventListener('click', closeModal);



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
    <button class="modal__button-close"><i class="fas fa-times"></i></button>
    <img src="${userData.picture.large}" alt="Image of ${userData.name.first} ${userData.name.last}" class="modal__image">
    <h2 class="modal__name">${userData.name.first} ${userData.name.last}</h2>
    <p class="modal__email">${userData.email}</p>
    <p class="modal__location">${userData.location.city}, ${userData.location.state}, ${userData.location.country}</p>
    <hr class="modal__hr">
    <p class="modal__telephone">${userData.cell}</p>
    <p class="modal__address">${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city} ${userData.location.state} ${userData.location.postcode} ${userData.location.country}</p>
    <p class="modal__birthday">Birthday: ${userDob}</p>
  </div>
  `;

  return modalContent;
}

function openModal(e) {
  const tileId = getUserId(e.target);
  console.log(tileId);
  const clickedUserData = userData[tileId];
  console.log(clickedUserData);
  // Use variable clickedUserData to render modal content
  const modalContent = getModalContent(clickedUserData);
  modal.innerHTML = modalContent;

  // Display modal window
  modal.style.display = 'flex';
}

function closeModal(e) {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') {
    modal.style.display = 'none';
  }
}
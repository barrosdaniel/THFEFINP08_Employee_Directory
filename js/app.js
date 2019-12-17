/* ======================================================================
UI Elements
======================================================================*/
const board = document.querySelector('.board');
const modalButtonClose = document.querySelector('.modal__button-close');
const modal = document.querySelector('.modal');



/* ======================================================================
Event Listeners
======================================================================*/
board.addEventListener('click', openModal);
modalButtonClose.addEventListener('click', closeModal);


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
      console.log(users[0].picture.thumbnail);
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

function openModal(e) {
  const tileId = getUserId(e.target);
  console.log(tileId);
  const clickedUserData = userData[tileId];
  console.log(clickedUserData);


  console.log(e);
  // console.log(e.target.parentElement);
  if (e.target.className === 'tile' ||
    e.target.parentElement.className === 'tile' ||
    e.target.parentElement.className === 'tile__text') {
    console.log(e.target);
  }
}

function closeModal() {
  modal.style.display = 'none';

}
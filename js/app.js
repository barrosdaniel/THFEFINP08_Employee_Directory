/* ======================================================================
UI Elements
======================================================================*/
const board = document.querySelector('.board');



/* ======================================================================
Event Listeners
======================================================================*/


/* ======================================================================
Controllers
======================================================================*/

/* ======================================================================
Logic
======================================================================*/
function getUserData() {
  fetch('https://randomuser.me/api/?results=12')
    .then((response) => response.json())
    .then((usersJSON) => {
      const users = usersJSON.results;
      console.log(users[0].picture.thumbnail);
      // Reset Board content
      board.innerHTML = '';
      let boardContent = '';
      for (let i = 0; i < users.length; i++) {
        // Generate Tile HTML
        const tileHTML = `
            <div class="tile">
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






    .catch((error) => console.log(error));
}
getUserData();

function renderUserTiles(users) {
  console.log(users);

}








// https://randomuser.me/api/?results=12
const hamburgerMenu = document.querySelector('.hamburger-menu')
const navButtons = document.querySelector('.navbar ul')

hamburgerMenu.addEventListener('click', (e) => {
  e.preventDefault();

  hamburgerMenu.classList.toggle('active');
  navButtons.classList.toggle('active');

});

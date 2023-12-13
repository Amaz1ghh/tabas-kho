// IMPORTS
import anime from "animejs";

// FONCTIONNEMENT
const hamburgerMenu = document.querySelector('.hamburger-menu')

hamburgerMenu.addEventListener('click', (e) => {
  e.preventDefault();

  hamburgerMenu.querySelector('svg').setAttribute('height', '35')

  anime({
    targets: '.hamburger-menu path:first-child',
    d: [
      { value: [
        'M1 1 L21 21']
      },
    ],
    easing: 'easeOutQuad',
    duration: 500,    
});

anime({
    targets: '.hamburger-menu path:last-child',
    d: [
        { value: [
          'M1 21 L21 1']
        },
      ],
    easing: 'easeOutQuad',
    duration: 500,
})
  
  
})


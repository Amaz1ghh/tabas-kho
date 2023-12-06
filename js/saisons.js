import Lenis from "@studio-freight/lenis"

// SMOOTH SCROLL LENIS
function initLenis() {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}

initLenis()

// CADRES DE PRESENTATION DES SAISON

// chaque cadre
const cadres = document.querySelectorAll('.cadre_presentation_saison')

cadres.forEach(cadre => {

  // get tous les boutons
  const allButtons = cadre.querySelectorAll('.trigger')
  const allTexts = cadre.querySelectorAll('.text')

  // fonction sur chaque bouton
  allButtons.forEach(btn => {
    
    btn.addEventListener('click', (e) => {
      e.preventDefault()

      // couleur plus foncée sur le bouton cliqué
      allButtons.forEach(btn => {
        btn.style.backgroundColor = 'rgb(var(--color-accent-light))'
      })
      btn.style.backgroundColor = 'rgb(var(--color-accent-dark))'

      // texte correspondant affiché
      allTexts.forEach(txt => {
        if (txt.getAttribute('data-text') == btn.getAttribute('data-button')) {
          txt.classList.add('active')
        }
        else {
          txt.classList.remove('active')
        }

      })
    })
  })

});

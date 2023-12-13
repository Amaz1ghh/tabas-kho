
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
        btn.classList.remove('active')
      })
      btn.classList.add('active')

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

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

const cadres = document.querySelectorAll('.cadre_presentation_saison')

cadres.forEach(cadre => {
  const avisButton = cadre.querySelector('.avis-button')

  const avisText = cadre.querySelector('.avis-text')

  avisButton.addEventListener('click', (e) => {
    e.preventDefault();
    avisText.classList.toggle('active')

    // XXX.classList.remove('active')
  })

});

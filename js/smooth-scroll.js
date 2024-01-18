import Lenis from "@studio-freight/lenis";


export class LenisSmoothScroll {
  constructor() {
    this.initLenis()
  }

  initLenis() {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }
}

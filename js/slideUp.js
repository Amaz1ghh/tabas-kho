import gsap from "gsap";
import {splitLetter} from "./utils.js";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)


export class SlideUp {
  constructor() {
    this.initializeState()
    this.loadSlideUpItems()
  }

  initializeState() {
    const slideUpItems = document.querySelectorAll("[data-slide-up]")

    slideUpItems.forEach(item => {
      if (item.querySelectorAll('div, span').length > 0) {
        splitLetter({el: item, lines: true})
      } else {
        splitLetter({el: item})
      }
      const letters = item.querySelectorAll("[data-letter]")

      gsap.set(letters, {
        y: 10,
        opacity: 0,
      })
      letters.forEach(letter => {
      })
    })

    gsap.set(slideUpItems, {
      opacity: 0,
    })
  }

  loadSlideUpItems() {
    const slideUpItems = document.querySelectorAll("[data-slide-up]")

    slideUpItems.forEach(item => {
      const letters = item.querySelectorAll("[data-letter]")

      gsap.to(letters, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=80px",
          toggleActions: "restart play pause reset",
          markers: true
        },
        duration: 0.1,
        opacity: 1,
        y: 0,
        ease: "inOut",
        stagger: .75 / (letters.length + 1),
      })

      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=80px",
          toggleActions: "restart play pause reset",
          markers: true
        },
        opacity: 1,
        duration: .5,
        ease: "power4.inOut",
      })
    })
  }
}

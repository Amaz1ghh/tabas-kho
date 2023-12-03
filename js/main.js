import {splitLetter} from "./utils.js";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import anime from "animejs";
import seriesData from "../data/series.json";

gsap.registerPlugin(ScrollTrigger)

class App {

  constructor() {
    this.initializeState()
    this.initLenis();
    // this.loadLoaderOverlay();
    this.manageNavbar()
    this.loadHeader()
    this.manageActorCards()
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

      letters.forEach(letter => {
        gsap.set(letters, {
          y: 10,
          opacity: 0,
        })
      })
    })
    gsap.set(slideUpItems, {
      opacity: 0,
    })

    const smoothAppearElements = document.querySelectorAll("[data-smooth-appear]")
    gsap.set(smoothAppearElements, {
      opacity: 0,
      y: 10,
    })
  }

  initLenis() {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }

  loadLoaderOverlay() {
    const seriesContainer = document.querySelector(".series-container")
    console.log(seriesData)

    seriesData.map(serie => {
      const p = document.createElement("p");
      p.innerText = serie
      if (serie === "Black Mirror") {
        p.classList.add("the-serie")
        splitLetter({el: p})
      }
      seriesContainer.appendChild(p)
    })

    window.addEventListener("load", e => {
      const tl = gsap.timeline()
      let i = 0;
      const p = seriesContainer.querySelectorAll("p");
      console.log(p)

      tl.set(".series-container", {
        y: "100%"
      })

      tl.to(".series-container", {
          y: "-75%",
          duration: 6,
        })
        .from(".series-container p", {
          opacity: 0,
          scale: 1.05,
          color: "rgba(var(--color-text), .6)",
          stagger: {
            amount: 4,
          },
        }, "-=5")
        .to(".the-serie span", {
          // color: "rgb(var(--color-accent))",
          // stagger: {
          //   amount: .3,
          // }
          onStart: () => {
            document.querySelector(".the-serie").classList.add("anim")
          }
        })
        .to(".series-container p", {
          color: "transparent",
          stagger: {
            amount: .5
          }
        })
        .to(".load-overlay", {
          opacity: 0,
          zIndex: -10,
          delay: .5,
        })
    })

  }

  manageNavbar() {
    gsap.to('.navbar', {
      scrollTrigger: {
        trigger: ".navbar",
        start: "10px top",
        toggleActions: "restart pause reverse pause",
        scrub: true,
      },
      background: "rgba(var(--color-background), .8)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgb(var(--color-secondary))"
    })
  }

  loadHeader() {
    const tl = gsap.timeline()
    splitLetter({selector: '.header-title'})

    tl.from(".header-title > span", {
        y: 0,
        opacity: 1,
        stagger: {
          amount: .5,
        },
        ease: "power4.inOut",
        delay: 1,
      })
      .from(".header-info > *", {
        x: 10,
        opacity: 0,
        stagger: {
          amount: .5
        },
        ease: "power4.inOut"
      })
      .from(".glow", {
        width: 0,
        height: 0,
        opacity: 0,
        ease: "power4.inOut",
        duration: 2
      }, "-=1")
      .from(".background", {
        opacity: 0,
        filter: "grayscale(100%)",
        duration: 1,
        ease: "none"
      }, "-=1.4")
  }

  manageActorCards() {
    const cards = document.querySelectorAll(".actor-card")

    cards.forEach(card => {
      const infoOverlay = card.querySelector(".actor-infos-overlay")
      const hoverOverlay = card.querySelector(".hover-overlay")

      // click
      card.addEventListener("click", e => {
        e.preventDefault()
        infoOverlay.classList.add("show")
        hoverOverlay.classList.add("not-show")
      })

      // scroll animation
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top-=60px bottom-=80px",
          toggleActions: "restart pause pause reset",
          markers: true,
        },
        opacity: 0,
        y: 40,
        scale: .8,
        duration: .8,
        ease: "power4.inOut",
      })
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
          toggleActions: "restart pause pause reset",
          markers: true
        },
        duration: 0.1,
        opacity: 1,
        y: 0,
        ease: "inOut",
        stagger: .75 / (letters.length + 1),
      }, "+=0")

      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=80px",
          toggleActions: "restart pause pause reset",
          markers: true
        },
        opacity: 1,
        duration: .5,
        ease: "power4.inOut",
      })
    })

    const smoothAppearElements = document.querySelectorAll("[data-smooth-appear]")
    smoothAppearElements.forEach(element => {
      gsap.to(smoothAppearElements, {
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=80px",
          toggleActions: "restart pause pause reset",
          markers: true
        },
        opacity: 1,
        y: 0
      })
    })
  }
}


new App();


if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule(
    "https://www.unpkg.com/css-houdini-squircle/squircle.min.js"
  );
}
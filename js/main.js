import {splitLetter} from "./utils.js";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import seriesData from "../data/series.json";
import {SlideUp} from "./slideUp.js";
import {LenisSmoothScroll} from "./smooth-scroll.js";
import Swiper from "swiper";
import {Navigation} from "swiper/modules"
import 'swiper/css/bundle';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger)

class App {
  constructor() {
    this.initializeState()
    // this.loadLoaderOverlay();
    this.manageActorCards()
    this.priceSection();
  }

  initializeState() {
    // const smoothAppearElements = document.querySelectorAll("[data-smooth-appear]")
    // gsap.set(smoothAppearElements, {
    //   opacity: 0,
    //   y: 10,
    // })
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
      e.preventDefault()
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

  priceSection() {
    const prices = gsap.utils.toArray(".price-wrapper > div")
    window.addEventListener("resize", ev => {
      if (window.innerWidth > 768) {
        // horizontal scroll
        gsap.to(prices, {
          xPercent: -100 * (prices.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".price-wrapper",
            pin: true,
            scrub: .2,
            snap: 1 / (prices.length - 1),
            end: () => "+=" + document.querySelector(".price-wrapper").offsetWidth
          }
        })
      }
    }, true)

  }
}


new LenisSmoothScroll();
new App();
new SlideUp();

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoHeight: true,
  autoplay: true,
  modules: [Navigation],

  effect: "fade",
  fadeEffect: {
    crossFade: true
  },

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule(
    "https://www.unpkg.com/css-houdini-squircle/squircle.min.js"
  );
}
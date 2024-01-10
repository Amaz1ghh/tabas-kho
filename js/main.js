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
    this.loaderIsLoaded = false
    this.initializeState()
    this.loadLoaderOverlay();
    this.loadHeader()
    this.manageActorCards()
    this.priceSection();
    this.navigationLinks()
  }

  initializeState() {
    // const smoothAppearElements = document.querySelectorAll("[data-smooth-appear]")
    // gsap.set(smoothAppearElements, {
    //   opacity: 0,
    //   y: 10,
    // })
  }

  loadHeader() {
    splitLetter({
      el: document.querySelector(".header-title"),
    })
    const tl = gsap.timeline()

    console.log(this.loaderIsLoaded)

    tl.fromTo(document.querySelectorAll(".header-title [data-letter]"), {
      opacity: 0,
      y: -10,
      rotate: 5,
    }, {
      opacity: 1,
      y: 0,
      rotate: 0,
      stagger: .04,
      duration: .4,
      ease: "power4.inOut",
      delay: !this.loaderIsLoaded ? 7.5 : .2
    })
    tl.from(".header-info > *", {
      opacity: 0,
      y: 10,
      stagger: .1,
      delay: .2
    })
    tl.from(".header .glow", {
      width: 0,
      height: 0,
    }, "-=.2")
    tl.from(".header .background", {
      opacity: 0,
      ease: "power4.inOut",
      duration: 2
    }, "-=1")
  }

  loadLoaderOverlay() {
    console.log("coucou", this.loaderIsLoaded)
    if (window.localStorage.getItem("loader") === null && window.innerWidth > 1040) {
      const seriesContainer = document.querySelector(".series-container")

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
        const seriesP = seriesContainer.querySelectorAll("p");

        tl.set(".series-container", {
          y: "50%"
        })

        tl.to(".series-container", {
          y: "-75%",
          duration: 4,
        })
          .from(".series-container p", {
            opacity: 0,
            scale: 1.05,
            color: "rgba(var(--color-text), .6)",
            stagger: {
              amount: 3,
            },
          }, "-=4")
          .to(".the-serie span", {
            // color: "rgb(var(--color-accent))",
            // stagger: {
            //   amount: .3,
            // }
            onStart: () => {
              document.querySelector(".the-serie").classList.add("anim")
            }
          })
          .to(".the-serie span", {
            color: "rgb(var(--color-accent))",
            stagger: {
              amount: .2,
            }
          })
          .to(".the-serie span", {
            color: "rgb(var(--color-text))",
            stagger: {
              amount: .2,
            },
          }, "-=.6")
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

      window.localStorage.setItem("loader", '1')
    } else {
      const loader = document.querySelector(".load-overlay")
      loader.style.display = "none"
      this.loaderIsLoaded = true
    }
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

  priceSectionScroll() {
    const prices = gsap.utils.toArray(".price-wrapper > div")

    console.log("Enable price section horizontal scroll")
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

  priceSection() {

    if (window.innerWidth > 768) {
      this.priceSectionScroll()
    }

    window.addEventListener("resize", ev => {
      if (window.innerWidth > 768) {
       this.priceSectionScroll()
      }
    }, true)

  }

  navigationLinks() {
    const navigationRect = document.querySelector("aside nav").getBoundingClientRect()
    const navLinks = document.querySelectorAll("aside nav a");
    const sections = document.querySelectorAll("section")
    const indicator = document.querySelector("aside nav span")

    window.onscroll = () => {
      sections.forEach(section => {
        let top = window.scrollY
        let offset = section.offsetTop - 150
        let height = section.offsetHeight
        let id = section.getAttribute("id")

        if (window.scrollY > window.innerHeight) {
          indicator.style.opacity = 1;
        } else {
          indicator.style.opacity = 0;
          navLinks.forEach(link => {
            link.classList.remove("active")
          })
        }

        if (top >= offset && top < offset + height) {
          navLinks.forEach(link => {
            if (link.getAttribute("href") == "#" + id) {
              link.classList.add("active")

              indicator.style.width = link.offsetWidth + "px"
              indicator.style.height = link.offsetHeight + "px"
              indicator.style.left = -(navigationRect.left - link.getBoundingClientRect().left) + "px"
            } else {
              link.classList.remove("active")
            }
          })
        }
      })
    }

    const shareButtonToggle = document.querySelector(".share-container button")
    const shareButtons = document.querySelector(".share-container ul")

    shareButtonToggle.addEventListener("click", e => {
      e.preventDefault()
      shareButtons.classList.toggle("show")
    })
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
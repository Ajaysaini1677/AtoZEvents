/* ==========================================
   AtoZ Events - Premium 2026 Website JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       MOBILE MENU
    ========================== */

    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navbar.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });

    /* ==========================
       STICKY HEADER EFFECT
    ========================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.style.background = "rgba(0,0,0,0.92)";
            header.style.boxShadow = "0 5px 25px rgba(0,0,0,.4)";
        } else {
            header.style.background = "rgba(0,0,0,.65)";
            header.style.boxShadow = "none";
        }
    });

    /* ==========================
       ANIMATED COUNTERS
    ========================== */

    const counters = document.querySelectorAll(".counter");
    let counterStarted = false;

    function runCounters() {

        if (counterStarted) return;

        counters.forEach(counter => {

            const target = +counter.dataset.target;
            let current = 0;

            const increment = target / 120;

            const updateCounter = () => {

                current += increment;

                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + "+";
                }

            };

            updateCounter();

        });

        counterStarted = true;
    }

    const counterSection = document.querySelector(".counter-section");

    if (counterSection) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    runCounters();
                }

            });

        }, {
            threshold: 0.4
        });

        observer.observe(counterSection);
    }

    /* ==========================
       PORTFOLIO FILTER
    ========================== */

    const filterButtons = document.querySelectorAll(".portfolio-filter button");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            portfolioItems.forEach(item => {

                if (
                    filter === "all" ||
                    item.classList.contains(filter)
                ) {
                    item.style.display = "block";
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                } else {
                    item.style.display = "none";
                }

            });

        });

    });

    /* ==========================
       TESTIMONIAL SLIDER
    ========================== */

    if (typeof Swiper !== "undefined") {

        new Swiper(".testimonial-slider", {

            loop: true,

            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },

            speed: 1000,

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            breakpoints: {
                320: {
                    slidesPerView: 1
                }
            }

        });

    }

    /* ==========================
       SCROLL REVEAL ANIMATION
    ========================== */

    const revealElements = document.querySelectorAll(
        ".service-card, .package-card, .team-card, .portfolio-item, .about-content, .about-images, .counter-box"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(60px)";
        el.style.transition = "all .8s ease";

        revealObserver.observe(el);

    });

    /* ==========================
       ACTIVE NAVIGATION LINK
    ========================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function activeMenu() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;

            if (
                pageYOffset >= sectionTop &&
                pageYOffset < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active-link");

            if (
                link.getAttribute("href") === `#${current}`
            ) {
                link.classList.add("active-link");
            }

        });

    }

    window.addEventListener("scroll", activeMenu);

    /* ==========================
       SMOOTH BUTTON HOVER EFFECT
    ========================== */

    const buttons = document.querySelectorAll(
        ".btn-primary, .btn-secondary, .quote-btn"
    );

    buttons.forEach(btn => {

        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "translateY(-4px)";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translateY(0)";
        });

    });

    /* ==========================
       FORM SUBMISSION
    ========================== */

    const form = document.querySelector(".quote-form");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            const button = form.querySelector("button");

            button.innerText = "Sending...";

            setTimeout(() => {

                alert(
                    "Thank you! Your event inquiry has been submitted successfully."
                );

                form.reset();

                button.innerText = "Get Free Quote";

            }, 1500);

        });

    }

    /* ==========================
       HERO PARALLAX EFFECT
    ========================== */

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {

        const scrollY = window.pageYOffset;

        if (hero) {

            hero.style.backgroundPositionY =
                scrollY * 0.5 + "px";

        }

    });

    /* ==========================
       PRELOADER (OPTIONAL)
    ========================== */

    window.addEventListener("load", () => {

        document.body.classList.add("loaded");

    });

});
document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Get all card elements
    const cards = gsap.utils.toArray(".card");

    cards.forEach((card, index) => {
        if (index < cards.length - 1) {
            const cardInner = card.querySelector(".card-inner");

            // Animate card on scroll
            gsap.fromTo(
                cardInner,
                {
                    y: "0%",
                    z: 0,
                    rotationX: 0,
                },
                {
                    y: "-50%",
                    z: -250,
                    rotationX: 45,
                    ease: "none",
                    scrollTrigger: {
                        trigger: cards[index + 1],
                        start: "top 85%",
                        end: "top -75%",
                        scrub: true,
                        pin: card,
                        pinSpacing: false,
                    },
                }
            );

            // Animate overlay opacity
            gsap.to(cardInner, {
                "--after-opacity": 1,
                ease: "none",
                scrollTrigger: {
                    trigger: cards[index + 1],
                    start: "top 75%",
                    end: "top -25%",
                    scrub: true,
                },
            });
        }
    });
});

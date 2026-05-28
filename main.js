document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Loader Animation
    const initLoader = () => {
        const tl = gsap.timeline();
        
        tl.to(".loader-text", {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut"
        })
        .to(".loader-text", {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            delay: 1
        })
        .to(".loader", {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                document.querySelector(".loader").style.display = "none";
                initHeroAnimations();
            }
        });
    };

    // Hero Section Animations
    const initHeroAnimations = () => {
        const tl = gsap.timeline();

        // Background subtle scale
        tl.to(".hero-bg", {
            scale: 1,
            duration: 10,
            ease: "power1.out"
        }, 0);

        // Copy reveal
        tl.to(".hero-copy .line", {
            opacity: 1,
            y: 0,
            duration: 2,
            stagger: 0.5,
            ease: "power3.out"
        }, 1);

        // Scroll indicator fade in
        tl.to(".scroll-indicator", {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut"
        }, 3);

        createParticles();
    };

    // Floating Particles System
    const createParticles = () => {
        const container = document.getElementById('particles');
        const particleCount = window.innerWidth < 768 ? 20 : 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            
            gsap.set(particle, {
                width: size,
                height: size,
                x: startX,
                y: startY,
                opacity: 0
            });
            
            container.appendChild(particle);

            // Animate particle
            animateParticle(particle);
        }
    };

    const animateParticle = (particle) => {
        const duration = Math.random() * 10 + 10;
        const targetX = gsap.getProperty(particle, "x") + (Math.random() * 100 - 50);
        const targetY = gsap.getProperty(particle, "y") - (Math.random() * 100 + 50);

        gsap.to(particle, {
            x: targetX,
            y: targetY,
            opacity: Math.random() * 0.5 + 0.1,
            duration: duration,
            ease: "sine.inOut",
            onComplete: () => {
                // Reset position if it goes too high
                if (gsap.getProperty(particle, "y") < -50) {
                    gsap.set(particle, {
                        y: window.innerHeight + 50,
                        x: Math.random() * window.innerWidth
                    });
                }
                animateParticle(particle);
            }
        });
    };

    // Scroll Animations
    const initScrollAnimations = () => {
        // Empathy text fade in
        gsap.utils.toArray(".fade-text").forEach(text => {
            gsap.to(text, {
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                },
                opacity: 1,
                y: 0,
                ease: "power1.out"
            });
        });

        // Generic fade up for concept and services
        gsap.utils.toArray(".fade-up").forEach(elem => {
            gsap.fromTo(elem, 
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out"
                }
            );
        });

        // Service items stagger
        gsap.utils.toArray(".service-item").forEach((item, i) => {
            gsap.fromTo(item,
                { opacity: 0, x: -30 },
                {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: "power2.out"
                }
            );
        });
        
        // Parallax effect for concept bg
        gsap.to(".concept-bg", {
            scrollTrigger: {
                trigger: ".concept",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: "20%",
            ease: "none"
        });
    };

    // Initialize all
    initLoader();
    initScrollAnimations();
});

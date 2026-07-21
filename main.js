document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Loader Animation
    const initLoader = () => {
        const tl = gsap.timeline();
        
        tl.to(".loader-text", {
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut"
        })
        .to(".loader-text", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            delay: 0.4
        })
        .to(".loader", {
            opacity: 0,
            duration: 0.3,
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

    // Sticky CTA Logic
    const initStickyCTA = () => {
        const stickyCTA = document.getElementById('sticky-cta');
        if (!stickyCTA) return;
        
        ScrollTrigger.create({
            start: "top -500",
            end: "bottom bottom",
            onUpdate: (self) => {
                // Show sticky only when scrolling down past 500px, but hide if at the very bottom
                if (self.direction === 1 && self.progress < 0.98) {
                    stickyCTA.classList.add('visible');
                } else {
                    stickyCTA.classList.remove('visible');
                }
            }
        });
    };

    // Initialize all
    initLoader();
    initScrollAnimations();
    initStickyCTA();
});

// Lightbox Functions (Global)
window.openLightbox = function(elem) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const img = elem.querySelector('img');
    
    if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    }
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
};

// Diagnosis Logic (Global)
const questions = [
    {
        q: "Q1. 日常生活の中で、最も「整えたい」と感じるものはどれですか？",
        options: [
            { text: "頭の中のざわつきや、思考のノイズ", target: 0, points: 2 },
            { text: "行動できない自分や、現実の停滞感", target: 1, points: 2 },
            { text: "人間関係のストレスや、ご縁の滞り", target: 2, points: 2 },
            { text: "将来への漠然とした不安や、守りが欲しい感覚", target: 3, points: 2 }
        ]
    },
    {
        q: "Q2. 「龍」という言葉から、今あなたが最も必要としている力はどれですか？",
        options: [
            { text: "浄化と静寂（リセット）", target: 0, points: 1 },
            { text: "突破力と現実化（エネルギー）", target: 1, points: 1 },
            { text: "循環とつながり（豊かさ）", target: 2, points: 1 },
            { text: "守護と統合（お守り）", target: 3, points: 1 }
        ]
    },
    {
        q: "Q3. 完成した図を飾る空間は、どのような場所にしたいですか？",
        options: [
            { text: "ぐっすり眠れる寝室や、集中したい書斎", target: 0, points: 1 },
            { text: "仕事の成果を出したいオフィスやデスク", target: 1, points: 1 },
            { text: "人が集まるリビングやサロン", target: 2, points: 1 },
            { text: "家全体の気を守る玄関や、特別な空間", target: 3, points: 1 }
        ]
    }
];

const results = [
    { name: "フトマニ百龍図", desc: "100体の龍が乱れた思考・感情・空間を整え、本来の中心へ戻していく図。思考のノイズを静め、深いリセットを求めるあなたに最適です。" },
    { name: "重ね百龍図", desc: "二つのエネルギーが重なり合うことで、願いではなく現実化する力を高める龍図。停滞を打破し、行動力と決断力を求めるあなたに最適です。" },
    { name: "円（縁）龍図", desc: "円は循環と繋がりの象徴。人・お金・仕事・愛情など人生の流れを円滑にし、良きご縁を引き寄せたいあなたに最適です。" },
    { name: "フトマニ132龍鳳図", desc: "龍は上昇、鳳凰は調和と再生。陰陽二つの存在が融合し、人生を守りながら前へ進める最上位の図。転換期を迎え、強力な守護を求めるあなたに最適です。" }
];

let currentStep = 0;
let diagScores = [0, 0, 0, 0];

window.renderQuestion = function() {
    const q = questions[currentStep];
    document.getElementById('diag-q').innerText = q.q;
    
    const optsContainer = document.getElementById('diag-opts');
    optsContainer.innerHTML = ''; // clear
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'diag-btn';
        btn.innerText = opt.text;
        btn.onclick = () => window.nextDiag(opt.target, opt.points);
        optsContainer.appendChild(btn);
    });
};

window.nextDiag = function(targetIndex, points) {
    diagScores[targetIndex] += points;
    currentStep++;
    
    if (currentStep < questions.length) {
        window.renderQuestion();
    } else {
        window.showDiagResult();
    }
};

window.showDiagResult = function() {
    document.getElementById('diag-q').style.display = 'none';
    document.getElementById('diag-opts').style.display = 'none';
    
    // Find max score index
    let maxIndex = 0;
    let maxScore = -1;
    for (let i = 0; i < diagScores.length; i++) {
        if (diagScores[i] > maxScore) {
            maxScore = diagScores[i];
            maxIndex = i;
        }
    }
    
    document.getElementById('res-name').innerText = results[maxIndex].name;
    document.getElementById('res-desc').innerText = results[maxIndex].desc;
    document.getElementById('diag-res').classList.add('active');
};

window.resetDiag = function() {
    currentStep = 0;
    diagScores = [0, 0, 0, 0];
    
    document.getElementById('diag-q').style.display = 'block';
    document.getElementById('diag-opts').style.display = 'flex';
    
    const diagRes = document.getElementById('diag-res');
    diagRes.classList.remove('active');
    void diagRes.offsetWidth; 
    
    window.renderQuestion();
};

// Initialize first question on load if the elements exist
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('diag-q')) {
        window.renderQuestion();
    }
});

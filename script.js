document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loader Logic
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    let loadProgress = 0;
    
    const loadingInterval = setInterval(() => {
        loadProgress += Math.floor(Math.random() * 15) + 5;
        if(loadProgress > 100) loadProgress = 100;
        
        if(loaderText) {
            loaderText.innerText = `Loading Institutional Data... ${loadProgress}%`;
        }
        
        if (loadProgress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.visibility = 'hidden', 800);
            }, 400);
        }
    }, 120);

    // 2. Scroll Progress & Sticky Navbar
    const scrollBar = document.getElementById('scrollBar');
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        if(scrollBar) scrollBar.style.width = scrollPercent + '%';

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Initialize AOS Animations
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // 4. Live Terminal Simulation (Demo Values Only - NO API)
    function simulateTerminalData() {
        const simVals = document.querySelectorAll('.sim-val');
        const simPcts = document.querySelectorAll('.sim-pct');
        
        setInterval(() => {
            simVals.forEach((el, index) => {
                const base = parseFloat(el.getAttribute('data-base'));
                // Create random fluctuation between -0.2% and +0.2%
                const fluctuation = base * (Math.random() * 0.004 - 0.002);
                const newVal = base + fluctuation;
                
                // Format based on asset type
                if (base > 1000) {
                    el.innerText = newVal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                } else {
                    el.innerText = newVal.toFixed(2);
                }

                // Update percentage color/value
                const pctEl = simPcts[index];
                const pctChange = (fluctuation / base) * 100;
                if(pctChange >= 0) {
                    pctEl.innerText = `+${pctChange.toFixed(2)}%`;
                    pctEl.className = 'text-success small sim-pct';
                } else {
                    pctEl.innerText = `${pctChange.toFixed(2)}%`;
                    pctEl.className = 'text-danger small sim-pct';
                }
            });
        }, 3000); // Update every 3 seconds
    }
    
    simulateTerminalData();

    // 5. Scroll Counters (For static stats in terminal)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 100; 

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    
                    const updateCount = () => {
                        const count = +counter.innerText;
                        const inc = target / speed;

                        if (count < target) {
                            counter.innerText = (count + inc).toFixed(1);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    animateCounters();

    // 6. Dynamic Year for Footer
    const yearElem = document.getElementById('year');
    if(yearElem) yearElem.textContent = new Date().getFullYear();

    // 7. Smooth Scroll for Anchor Links (Mobile Menu Fix)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.getElementById('navbarNav');
            if(navbarCollapse.classList.contains('show')) {
                let bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
                bsCollapse.hide();
            }
        });
    });
});
// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Save preference
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }
});
// ===========================================================================================================
// CMS LIVE TERMINAL: REAL-TIME DATA FETCHER (JAVASCRIPT)
// ===========================================================================================================

async function updateCMSLiveTerminal() {
    try {
        // Here you can connect your free public API or Broker API endpoint (e.g., Yahoo Finance / Alpha Vantage / Broker WebSocket)
        // For demonstration, fetching live market JSON feed:
        let response = await fetch('https://api.yourdomain.com/get-live-rates'); // Replace with your actual backend or API URL
        let data = await response.json();

        // Updating Nifty 50 Value dynamically on the website terminal
        if (data.nifty) {
            document.getElementById('nifty-price').innerText = data.nifty.price;
            document.getElementById('nifty-change').innerText = data.nifty.change + '%';
            document.getElementById('nifty-change').style.color = data.nifty.change >= 0 ? '#00FF00' : '#FF0000';
        }

        // Updating BankNifty Value dynamically
        if (data.banknifty) {
            document.getElementById('banknifty-price').innerText = data.banknifty.price;
            document.getElementById('banknifty-change').innerText = data.banknifty.change + '%';
            document.getElementById('banknifty-change').style.color = data.banknifty.change >= 0 ? '#00FF00' : '#FF0000';
        }

        // Similarly updating Gold and USDINR elements in your HTML IDs
    } catch (error) {
        console.error("Live Terminal Connection Waiting/Retrying...", error);
    }
}

// Auto-refresh the terminal every 2 seconds for real-time tick experience
setInterval(updateCMSLiveTerminal, 2000);
// ===========================================================================================================

Production website update

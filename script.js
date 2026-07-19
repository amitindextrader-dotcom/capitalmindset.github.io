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
    if(typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // 4. Live Terminal Simulation (Demo Values Only - NO API)
    function simulateTerminalData() {
        const simVals = document.querySelectorAll('.sim-val');
        const simPcts = document.querySelectorAll('.sim-pct');
        
        setInterval(() => {
            simVals.forEach((el, index) => {
                const base = parseFloat(el.getAttribute('data-base'));
                if(!base) return;
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
                if(pctEl) {
                    const pctChange = (fluctuation / base) * 100;
                    if(pctChange >= 0) {
                        pctEl.innerText = `+${pctChange.toFixed(2)}%`;
                        pctEl.className = 'text-success small sim-pct';
                    } else {
                        pctEl.innerText = `${pctChange.toFixed(2)}%`;
                        pctEl.className = 'text-danger small sim-pct';
                    }
                }
            });
        }, 3000); // Update every 3 seconds
    }
    
    simulateTerminalData();

    // 5. Dynamic Year for Footer
    const yearElem = document.getElementById('year');
    if(yearElem) yearElem.textContent = new Date().getFullYear();

    // 6. Smooth Scroll for Anchor Links (Mobile Menu Fix)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.getElementById('navbarNav');
            if(navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Check if bootstrap is defined
                if(typeof bootstrap !== 'undefined') {
                    let bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
                    bsCollapse.hide();
                } else {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        // Save preference
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }
});
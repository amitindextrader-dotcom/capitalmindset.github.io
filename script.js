/**
 * Capital Mindset CMS Pro - Frontend Architecture
 * Premium SaaS Interactions & Real-time Simulations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Boot Sequence (Loader) ---
    const loader = document.getElementById('loader');
    if (loader) {
        // Simulating core kernel load
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
            }, 500);
        }, 1200);
    }

    // --- 2. Dynamic Clock for Terminal ---
    const terminalClock = document.getElementById('terminal-clock');
    if (terminalClock) {
        setInterval(() => {
            const now = new Date();
            terminalClock.innerText = now.toISOString().substring(11, 19) + ' UTC';
        }, 1000);
    }

    // --- 3. Scroll Interactions (Navbar & Reveal) ---
    const navbar = document.getElementById('navbar');
    const fadeElements = document.querySelectorAll('.fade-up-element');

    const handleScroll = () => {
        // Navbar blur effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Element reveal
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Reveal when element is in viewport
            if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85) {
                el.classList.add('visible');
            }
        });
    };

    // Initial check & listener
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- 4. Algorithmic Data Simulation (Strictly Demo) ---
    // Simulates slight tick fluctuations for visual fidelity
    const simulateDataFeed = () => {
        const valueNodes = document.querySelectorAll('.sim-val');
        const pctNodes = document.querySelectorAll('.sim-pct');
        
        setInterval(() => {
            valueNodes.forEach((node, index) => {
                const baseValue = parseFloat(node.getAttribute('data-base'));
                
                // Algorithmic jitter: between -0.15% and +0.15%
                const volatility = baseValue * (Math.random() * 0.003 - 0.0015);
                const currentValue = baseValue + volatility;
                
                // Format appropriately (crypto vs index)
                let formattedValue = '';
                if (baseValue > 1000) {
                    formattedValue = currentValue.toLocaleString('en-US', {
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2
                    });
                } else {
                    formattedValue = currentValue.toFixed(2);
                }
                
                node.innerText = formattedValue;
                
                // Manage % UI states
                const pctNode = pctNodes[index];
                if (pctNode) {
                    const pctChange = (volatility / baseValue) * 100;
                    if (pctChange >= 0) {
                        pctNode.innerText = `+${pctChange.toFixed(2)}%`;
                        pctNode.className = 'py-3 px-4 text-end sim-pct text-success';
                    } else {
                        pctNode.innerText = `${pctChange.toFixed(2)}%`;
                        pctNode.className = 'py-3 px-4 text-end sim-pct text-danger';
                    }
                }
            });
        }, 2500); // Poll frequency
    };
    
    // Initialize Simulation Engine
    simulateDataFeed();
    
    // --- 5. Mobile Nav Control ---
    const navLinks = document.querySelectorAll('.nav-link, .btn-nav');
    const navCollapse = document.getElementById('navContent');
    const bsCollapse = navCollapse ? new bootstrap.Collapse(navCollapse, { toggle: false }) : null;

    if (bsCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }

});
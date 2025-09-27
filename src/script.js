
(function () {
    
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;


    const linearBars = skillsSection.querySelectorAll('.skill-bar-fill');
    const circulars = skillsSection.querySelectorAll('.circular');

   
    function animateLinear(bar, delay = 0) {
        const targetPercent = bar.getAttribute('data-percent') || '0';
        setTimeout(() => {
            bar.style.width = targetPercent + '%';
        }, delay);
    }

    
    function animateCircular(circle, targetPercent, duration = 1400) {
        const start = performance.now();
        const inner = circle.querySelector('.circle-inner');
        const percentText = inner ? inner.querySelector('.circle-percent') : null;

        function step(now) {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.round(eased * targetPercent);
            const deg = current * 3.6; 

            circle.style.background = `conic-gradient(var(--primary-color) ${deg}deg, rgba(255,255,255,0.06) 0deg)`;
            if (percentText) percentText.textContent = current + '%';

            if (t < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                linearBars.forEach((bar, i) => animateLinear(bar, i * 120));

               
                circulars.forEach((circle, i) => {
                    const target = parseInt(circle.getAttribute('data-percent') || '0', 10);
                    setTimeout(() => animateCircular(circle, target), i * 160);
                });

                observer.disconnect();
            }
        });
    }, { threshold: 0.25 });

    observer.observe(skillsSection);
})();




document.addEventListener('DOMContentLoaded', () => {
    // Simulate real-time data updates
    setInterval(updateWaitTimes, 5000);
    setInterval(updateHeatmap, 3000);

    function updateWaitTimes() {
        const slots = document.querySelectorAll('.queue-list li');
        slots.forEach(slot => {
            const label = slot.querySelector('.label').textContent;
            const valueSpan = slot.querySelector('.value');
            const fill = slot.querySelector('.fill');

            if (label.includes('Concessions')) {
                const wait = Math.floor(Math.random() * 5) + 5;
                valueSpan.textContent = `~${wait} mins`;
                fill.style.width = `${(wait / 15) * 100}%`;
                updateColor(fill, wait, 7, 12);
            } else if (label.includes('Restrooms')) {
                const wait = Math.floor(Math.random() * 3) + 1;
                valueSpan.textContent = `~${wait} mins`;
                fill.style.width = `${(wait / 10) * 100}%`;
                updateColor(fill, wait, 4, 8);
            }
        });
    }

    function updateColor(el, val, low, med) {
        el.classList.remove('green', 'yellow', 'red');
        if (val < low) el.classList.add('green');
        else if (val < med) el.classList.add('yellow');
        else el.classList.add('red');
    }

    function updateHeatmap() {
        const points = document.querySelectorAll('.heatmap-point');
        points.forEach(pt => {
            const dx = (Math.random() - 0.5) * 5;
            const dy = (Math.random() - 0.5) * 5;
            const cx = parseFloat(pt.getAttribute('cx')) + dx;
            const cy = parseFloat(pt.getAttribute('cy')) + dy;
            
            // Boundary checks for the demo
            if (cx > 30 && cx < 170) pt.setAttribute('cx', cx);
            if (cy > 30 && cy < 90) pt.setAttribute('cy', cy);
            
            pt.setAttribute('r', Math.random() * 6 + 4);
        });
    }

    // Add haptic-like interaction feedback
    const interactiveElements = document.querySelectorAll('.interactive, button');
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', () => {
             el.style.opacity = '0.7';
        });
        el.addEventListener('touchend', () => {
             el.style.opacity = '1';
        });
    });

    // Mock Notification trigger
    document.getElementById('notifications').addEventListener('click', () => {
        const messages = [
            "Section 104: Concessions wait time just dropped to 2 mins!",
            "Quarter 2 starting in 5 minutes. Head to your seats.",
            "Reminder: Use Gate 4 for faster exit after the game."
        ];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        alert(`StadiumPulse Alert: ${msg}`);
    });

    // Seat Finder Simulation
    document.querySelector('.primary-btn').addEventListener('click', () => {
        const seat = document.getElementById('user-seat');
        const path = document.getElementById('seat-path');
        const btn = document.querySelector('.primary-btn');

        if (seat.style.display === 'none') {
            seat.style.display = 'block';
            path.setAttribute('d', 'M50,110 Q70,70 100,40');
            path.style.strokeDashoffset = '100';
            path.style.strokeDasharray = '100';
            path.animate([
                { strokeDashoffset: '100' },
                { strokeDashoffset: '0' }
            ], { duration: 1500, easing: 'ease-out', fill: 'forwards' });
            
            btn.textContent = "Seat Located";
            setTimeout(() => {
                btn.textContent = "Find My Seat";
                seat.style.display = 'none';
                path.setAttribute('d', '');
            }, 5000);
        }
    });
});

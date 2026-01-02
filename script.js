// --- LOGICA DE SONIDOS (Web Audio API) ---
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        function playSound(frequency, type, duration, volume) {
            const oscillator = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
            gain.gain.setValueAtTime(volume, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
            oscillator.connect(gain);
            gain.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + duration);
        }

        // Sonido para clics
        const playBtnSound = () => playSound(1000, 'sine', 0.5, 0.5);
        // Sonido para hover
        const playHoverSound = () => playSound(1000, 'triangle', 0.5, 0.5);

        // Menú Móvil
        const menuToggle = document.getElementById('mobile-menu');
        const navList = document.getElementById('nav-list');
        menuToggle.addEventListener('click', () => {
            playBtnSound();
            navList.classList.toggle('active');
        });
        function closeMenu() { navList.classList.remove('active'); }

        // Botón Subir
        const scrollBtn = document.getElementById("scrollTopBtn");
        window.onscroll = function() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                scrollBtn.style.display = "block";
            } else {
                scrollBtn.style.display = "none";
            }
        };
        scrollBtn.addEventListener("click", () => {
            playBtnSound();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });

        // Cronómetros
        function countdown(targetDate, elementId) {
            const target = new Date(targetDate).getTime();
            const element = document.getElementById(elementId);
            const timer = setInterval(() => {
                const now = new Date().getTime();
                const distance = target - now;
                if (distance < 0) {
                    element.textContent = "EXPIRADO";
                    element.classList.remove('timer-urgent');
                    clearInterval(timer);
                    return;
                }
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (distance < 86400000) element.classList.add('timer-urgent');
                element.textContent = `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
            }, 1000);
        }

        countdown("Dec 29, 2025 14:24:10", "timer1"); 
        countdown("Dec 29, 2025 14:24:21", "timer2"); 
        countdown("Dec 29, 2025 14:24:23", "timer3"); 
        countdown("Dec 29, 2025 14:24:25", "timer4");

        // Inyección de Carreras
        const programas = [
            { t: "Microsoft Office LTSC Project&trade;", d: "" },
            { t: "Microsoft Office LTSC Visio&trade;", d: "" },
            { t: "Microsoft Office LTSC Access&trade;", d: "" },
            { t: "Microsoft Office LTSC Excel&trade;", d: "" }, 
            { t: "Microsoft Office LTSC Word&trade;", d: "" }, 
            { t: "Microsoft Office LTSC PowerPoint&trade;", d: "" },
            { t: "Microsoft Office LTSC Outlook&trade;", d: "" },
            { t: "Microsoft Office LTSC Teams&trade;", d: "" }, 
            { t: "Microsoft Office LTSC OneNote&trade;", d: ""},
            { t: "Microsoft Office LTSC Loop&trade;", d: "" }, 
            { t: "Núcleos lingüísticos en general", d: "" }, 
            { t: "Tarjeta tipo carné virtual", d: "" }
            
        ];
        const ctn = document.getElementById('carreras-container');
        programas.forEach(p => {
            ctn.innerHTML += `
                <div class="pro-card snd-hover" onclick="playBtnSound(); alert('Redirigiendo a detalles de ${p.t}...')">
                    <h3>${p.t}</h3>
                    <p>${p.d}</p>
                    <span style="display:block; margin-top:20px; color:var(--secondary); font-weight:bold; font-size:0.9rem;">Ver Plan de Estudios →</span>
                </div>`;
        });

        function toggleChat() {
            playBtnSound();
            const win = document.getElementById('chatWin');
            win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
        }
        function sendChat() {
            const input = document.getElementById('chatInput');
            const body = document.getElementById('chatBody');
            if(!input.value) return;
            playBtnSound();
            body.innerHTML += `<div style="text-align:right; margin-bottom:10px; color:var(--primary);"><b>Tú:</b> ${input.value}</div>`;
            input.value = "";
            setTimeout(() => {
                body.innerHTML += `<div style="margin-bottom:10px; color:#555;"><b>Asistente:</b> ¡Entendido! Un asesor se pondrá en contacto pronto.</div>`;
                body.scrollTop = body.scrollHeight;
            }, 600);
        }
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            playBtnSound();
            alert('¡Gracias! Su solicitud ha sido registrada.');
            this.reset();
        });

        // Asignación de eventos de sonido a elementos existentes
        document.addEventListener('mouseover', (e) => {
            if(e.target.closest('.snd-hover') || e.target.closest('.nav-links a')) {
                playHoverSound();
            }
        });

        document.addEventListener('click', (e) => {
            if(e.target.closest('.snd-click') || e.target.closest('.nav-links a')) {
                playBtnSound();
            }
            // Activar AudioContext en la primera interacción (requerido por navegadores)
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
        });

        document.addEventListener("DOMContentLoaded", function() {
    const phoneInput = document.getElementById('phone');
    const emailUserInput = document.getElementById('emailUser');
    const dateInput = document.getElementById('contactDate');
    const contactForm = document.getElementById('contactForm');

    // 1. Validación de Teléfono (Formato 0000-0000 y solo números)
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Elimina lo que no sea dígito
        if (value.length > 4) {
            value = value.slice(0, 4) + "-" + value.slice(4, 8);
        }
        e.target.value = value;
    });

    // 2. Validación de Correo (Solo letras y dígitos, sin @ ni signos)
    emailUserInput.addEventListener('input', function(e) {
        // Remueve cualquier cosa que no sea letras o números
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    });

    // 3. Restricción de Fecha (Máximo 01 de Junio 2026)
    const today = new Date().toISOString().split('T')[0];
    const maxDate = "2026-06-01";
    dateInput.setAttribute('min', today);
    dateInput.setAttribute('max', maxDate);

    // 4. Preparación antes de enviar a Formspree
    contactForm.addEventListener('submit', function(e) {
        const user = emailUserInput.value;
        const domain = document.getElementById('emailDomain').value;
        // Unimos el usuario y el dominio en el campo oculto
        document.getElementById('fullEmail').value = user + domain;
        
        // El formulario se enviará normalmente a Formspree
    });
});

document.addEventListener("DOMContentLoaded", function() {

    // 1. Bloquear el menú contextual (Clic Derecho)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert("El copiado de contenido está deshabilitado en esta Academia.");
    }, false);

    // 2. Bloquear combinaciones de teclas (Ctrl+C, Ctrl+V, Ctrl+U, F12)
    document.addEventListener('keydown', function(e) {
        // Bloquea Ctrl+C (Copiar)
        // Bloquea Ctrl+U (Ver código fuente)
        // Bloquea Ctrl+S (Guardar)
        // Bloquea F12 (Herramientas de desarrollador)
        if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 83) || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
    });

    // 3. Bloquear el arrastre de imágenes
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
    }, false);
});

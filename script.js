document.addEventListener('DOMContentLoaded', () => {
    const comenzarBtn = document.getElementById('comenzar-btn');
    const reiniciarBtn = document.getElementById('reiniciar-btn');
    const opcionBtns = document.querySelectorAll('.opcion-btn');
    const pantallas = document.querySelectorAll('.pantalla');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const pantallaFinal = document.getElementById('pantalla-final');
    const textoGuia = document.getElementById('texto-guia');
    const preguntaContainer = document.getElementById('pregunta-container');
    const preguntaElemento = document.getElementById('pregunta');
    const mensaje = document.getElementById('mensaje');
    const iconoMensaje = document.getElementById('icono-mensaje');

    let preguntas = [
        { id: 1, pregunta: '5 + 3 = ?', opciones: ['8', '7', '6'], correcta: '8' },
        { id: 2, pregunta: '7 - 4 = ?', opciones: ['3', '2', '1'], correcta: '3' },
        { id: 3, pregunta: '6 x 2 = ?', opciones: ['12', '14', '16'], correcta: '12' },
        { id: 4, pregunta: '9 / 3 = ?', opciones: ['3', '2', '1'], correcta: '3' },
        { id: 5, pregunta: '10 - 7 = ?', opciones: ['3', '2', '1'], correcta: '3' }
    ];
    let problemaActual = null;
    let preguntasResueltas = 0;

    const historia = [
        '¡Bienvenido al laberinto matemático! Resuelve 5 problemas para completarlo.',
        '¡Muy bien, ahora hay que resolver el siguiente problema!',
        '¡Excelente, ya llevas dos, sigue así!',
        '¡Perfecto, llevas tres, no te detengas!',
        '¡Increíble, sólo falta uno más!',
        '🎉 ¡Felicidades, has completado el laberinto matemático! 🎉'
    ];

    comenzarBtn.addEventListener('click', iniciarJuego);
    reiniciarBtn.addEventListener('click', reiniciarJuego);
    opcionBtns.forEach(btn => btn.addEventListener('click', verificarRespuesta));

    function iniciarJuego() {
        mostrarPantalla(pantallaJuego);
        mostrarTextoGuia(historia[0]);
        mostrarPregunta();
    }

    function mostrarTextoGuia(texto) {
        textoGuia.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < texto.length) {
                textoGuia.textContent += texto.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                textoGuia.scrollIntoView({ behavior: 'smooth' });
            }
        }, 30);
    }

    function mostrarPregunta() {
        do {
            problemaActual = preguntas[Math.floor(Math.random() * preguntas.length)];
        } while (problemaActual.usada);
        problemaActual.usada = true;

        preguntaElemento.textContent = problemaActual.pregunta;
        opcionBtns.forEach((btn, index) => {
            btn.textContent = problemaActual.opciones[index];
        });
        mensaje.textContent = '';
        iconoMensaje.classList.add('oculto');
        preguntaContainer.classList.remove('oculto');
    }

    function verificarRespuesta(event) {
        const respuesta = event.target.textContent;
        if (respuesta === problemaActual.correcta) {
            mensaje.textContent = '¡Correcto!';
            mensaje.style.color = '#00ff00';
            iconoMensaje.src = 'images/correcto.png';
            iconoMensaje.classList.remove('oculto');
            preguntasResueltas++;
            if (preguntasResueltas < 5) {
                mostrarTextoGuia(historia[preguntasResueltas]);
                setTimeout(mostrarPregunta, 1000);
            } else {
                setTimeout(finalizarJuego, 1000);
            }
        } else {
            mensaje.textContent = 'Incorrecto. Inténtalo de nuevo.';
            mensaje.style.color = '#ff4500';
            iconoMensaje.src = 'images/incorrecto.png';
            iconoMensaje.classList.remove('oculto');
        }
    }

    function finalizarJuego() {
        mostrarPantalla(pantallaFinal);
    }

    function mostrarPantalla(pantalla) {
        pantallas.forEach(p => p.classList.remove('activa'));
        pantalla.classList.add('activa');
    }

    function reiniciarJuego() {
        location.reload();
    }

    // Iniciar en pantalla inicial
    mostrarPantalla(pantallaInicial);
});

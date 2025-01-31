document.addEventListener('DOMContentLoaded', () => {
    const comenzarBtn = document.getElementById('comenzar-btn');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaAventura = document.getElementById('pantalla-aventura');
    const celdas = document.querySelectorAll('.celda');
    const textoGuia = document.getElementById('texto-guia');
    const jefeContainer = document.getElementById('jefe-container');
    const jefeImagen = document.getElementById('jefe-imagen');
    const textoJefe = document.getElementById('texto-jefe');
    const preguntaJefe = document.getElementById('pregunta-jefe');
    const respuestaJefe = document.getElementById('respuesta-jefe');
    const enviarRespuestaBtn = document.getElementById('enviar-respuesta-btn');
    let preguntasResueltas = 0;
    let problemaActual = null;
    let celdaActual = null;
    const historia = [
        '¡Bienvenido al laberinto matemático! Resuelve 5 problemas para completarlo.',
        '¡Muy bien, ahora hay que vencer al siguiente!',
        '¡Muy bien, ahora hay que vencer al siguiente!',
        '¡Muy bien, ahora hay que vencer al siguiente!',
        '¡Muy bien, ahora hay que vencer al siguiente!',
        '¡Felicidades, has completado el laberinto!'
    ];
    const jefes = [
        {
            imagen: 'images/jefe1.png',
            dialogo: 'Soy el jefe 1, resuelve mi problema para pasar.'
        },
        {
            imagen: 'images/jefe2.png',
            dialogo: 'Soy el jefe 2, resuelve mi problema para pasar.'
        },
        {
            imagen: 'images/jefe3.png',
            dialogo: 'Soy el jefe 3, resuelve mi problema para pasar.'
        },
        {
            imagen: 'images/jefe4.png',
            dialogo: 'Soy el jefe 4, resuelve mi problema para pasar.'
        },
        {
            imagen: 'images/jefe5.png',
            dialogo: 'Soy el jefe 5, resuelve mi problema para pasar.'
        }
    ];

    comenzarBtn.addEventListener('click', () => {
        pantallaInicial.classList.add('oculto');
        pantallaInicial.addEventListener('transitionend', () => pantallaInicial.remove());
        pantallaAventura.classList.remove('oculto');
        mostrarTextoGuia(historia[0], 'audio/bienvenida.mp3');
    });

    celdas.forEach(celda => {
        celda.addEventListener('click', () => {
            if (celda.classList.contains('start')) {
                mostrarTextoGuia('Comienza tu aventura resolviendo el primer problema.', 'audio/comienza.mp3');
            } else if (celda.classList.contains('end')) {
                if (preguntasResueltas >= 5) {
                    mostrarTextoGuia(historia[5], 'audio/fin.mp3');
                } else {
                    mostrarTextoGuia('Debes resolver al menos 5 problemas para llegar al final.', 'audio/debes-resolver.mp3');
                }
            } else if (!celda.classList.contains('resolved')) {
                problemaActual = generarProblemaMatematico();
                celda.classList.add('expandida');
                celdaActual = celda;
                mostrarJefe(preguntasResueltas, problemaActual);
            }
        });
    });

    enviarRespuestaBtn.addEventListener('click', () => {
        const respuesta = parseInt(respuestaJefe.value);
        if (respuesta === problemaActual.respuesta) {
            celdaActual.style.backgroundColor = '#a4e5a4';
            celdaActual.classList.add('resolved');
            preguntasResueltas++;
            jefeContainer.classList.add('oculto');
            respuestaJefe.value = '';
            if (preguntasResueltas < 5) {
                mostrarTextoGuia(historia[preguntasResueltas], 'audio/siguiente.mp3');
            } else {
                mostrarTextoGuia(historia[5], 'audio/fin.mp3');
            }
        } else {
            celdaActual.style.backgroundColor = '#e5a4a4';
            mostrarTextoGuia('Respuesta incorrecta. Inténtalo de nuevo.', 'audio/incorrecta.mp3');
        }
        celdas.forEach(celda => celda.classList.remove('expandida'));
    });

    function generarProblemaMatematico() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        return {
            pregunta: `${num1} + ${num2} = ?`,
            respuesta: num1 + num2
        };
    }

    function mostrarTextoGuia(texto, audioRuta) {
        textoGuia.textContent = '';
        const audio = new Audio(audioRuta);
        let i = 0;
        const interval = setInterval(() => {
            if (i < texto.length) {
                textoGuia.textContent += texto.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                audio.play();
                textoGuia.scrollIntoView({ behavior: 'smooth' });
            }
        }, 30); // Aumentamos la velocidad del texto a 30ms por carácter
    }

    function mostrarJefe(indice, problema) {
        const jefe = jefes[indice];
        jefeImagen.src = jefe.imagen;
        textoJefe.textContent = '';
        preguntaJefe.textContent = problema.pregunta;
        jefeContainer.classList.remove('oculto');
        let i = 0;
        const interval = setInterval(() => {
            if (i < jefe.dialogo.length) {
                textoJefe.textContent += jefe.dialogo.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                new Audio(`audio/jefe${indice + 1}.mp3`).play();
                jefeContainer.scrollIntoView({ behavior: 'smooth' });
            }
        }, 30); // Aumentamos la velocidad del texto a 30ms por carácter
    }
});

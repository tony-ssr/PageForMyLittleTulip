/**
 * Script principal para la página dedicatoria "Para mi tulipán"
 * Autor: Diego Yaqueno
 * Versión: 1.0.0
 * Descripción: Implementa efectos visuales y animaciones para mejorar la experiencia de usuario
 */

// Variables globales para la modal
let modal = null;
let modalTitle = null;
let modalMediaContainer = null;

// Función para abrir la modal
function openModal(mediaPath, title, isVideo = false) {
    modal = document.getElementById('mediaModal');
    modalTitle = document.getElementById('modalTitle');
    modalMediaContainer = document.getElementById('modalMediaContainer');

    // Limpiar el contenedor
    modalMediaContainer.innerHTML = '';

    // Crear el elemento multimedia apropiado
    const mediaElement = isVideo ? createVideoElement(mediaPath) : createImageElement(mediaPath);
    modalMediaContainer.appendChild(mediaElement);

    // Establecer el título
    modalTitle.textContent = title;

    // Mostrar la modal con animación
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Cerrar la modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Función para crear elemento de video
function createVideoElement(path) {
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    const source = document.createElement('source');
    source.src = path;
    source.type = 'video/mp4';
    video.appendChild(source);
    return video;
}

// Función para crear elemento de imagen
function createImageElement(path) {
    const img = document.createElement('img');
    img.src = path;
    img.alt = 'Momento especial';
    return img;
}

// Función para cerrar la modal
function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        modalMediaContainer.innerHTML = '';
    }, 300);
}

/**
 * Inicializa todas las funcionalidades cuando el DOM está completamente cargado
 * Esto asegura que todos los elementos HTML estén disponibles antes de manipularlos
 */
document.addEventListener('DOMContentLoaded', function() {
    // Crea los tulipanes animados en el fondo
    createBackgroundTulips();
    
    // Inicializa la animación de entrada para los elementos principales
    animateElements();
    
    // Configura el efecto parallax para los tulipanes que responde al movimiento del ratón
    parallaxEffect();
    
    // Configura el efecto de aparición gradual para elementos al hacer scroll
    revealOnScroll();
    
    // Registra eventos para interactividad adicional
    setupInteractivity();
    
    // Inicializa el efecto parallax para los tulipanes de fondo durante el scroll
    initBackgroundParallax();
    
    // Inicializa el sistema de temas (claro/oscuro)
    initThemeSystem();
    
    // Inicializa el carrusel tipo libro
    initBookCarousel();
});

/**
 * Anima los elementos principales al cargar la página con un efecto de entrada secuencial
 * Cada sección aparece gradualmente con un ligero retraso entre ellas para crear un efecto cascada
 */
function animateElements() {
    // Selecciona los elementos principales que serán animados
    const header = document.querySelector('header');
    const dedication = document.querySelector('.dedication');
    const gallery = document.querySelector('.gallery');
    const childhood = document.querySelector('.childhood-photos');
    const poem = document.querySelector('.poem');
    
    // Objeto con configuraciones de animación para cada elemento
    const elements = [
        { el: header, delay: 300 },
        { el: dedication, delay: 600 },
        { el: gallery, delay: 900 },
        { el: childhood, delay: 1100 },
        { el: poem, delay: 1300 }
    ];
    
    // Aplica las animaciones a cada elemento con su respectivo retraso
    elements.forEach(item => {
        setTimeout(() => {
            // Hace visible el elemento y lo mueve a su posición final
            item.el.style.opacity = '1';
            item.el.style.transform = 'translateY(0)';
            
            // Añade una clase para indicar que la animación ha terminado
            item.el.classList.add('animated');
        }, item.delay);
    });
    
    // Registra en consola para depuración (solo en desarrollo)
    console.log('Animaciones de entrada inicializadas');
}

/**
 * Implementa un efecto parallax suave para los tulipanes que responde al movimiento del cursor
 * Los tulipanes se mueven ligeramente en dirección opuesta al movimiento del ratón
 * creando una sensación de profundidad y dinamismo en la página
 */
function parallaxEffect() {
    // Selecciona todos los elementos de tulipán en la página
    const tulips = document.querySelectorAll('.tulip');
    
    // Si no hay tulipanes, salimos de la función
    if (tulips.length === 0) {
        console.warn('No se encontraron elementos de tulipán para el efecto parallax');
        return;
    }
    
    // Configura el evento de movimiento del ratón
    window.addEventListener('mousemove', (e) => {
        // Calcula la posición relativa del cursor (valores entre 0 y 1)
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Aplica la transformación a cada tulipán
        tulips.forEach(tulip => {
            // Calcula el desplazamiento basado en la posición del cursor
            // El factor 20 determina la intensidad del efecto
            const offsetX = (x - 0.5) * 20;
            const offsetY = (y - 0.5) * 20;
            
            // Aplica la transformación con una transición suave (definida en CSS)
            tulip.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
    
    console.log('Efecto parallax inicializado para', tulips.length, 'tulipanes');
}

/**
 * Implementa un efecto de revelación gradual para elementos cuando aparecen en el viewport
 * Utiliza la API Intersection Observer para detectar cuándo los elementos son visibles
 * y aplicar animaciones de forma eficiente sin afectar el rendimiento
 */
function revealOnScroll() {
    // Selecciona los elementos que se revelarán al hacer scroll
    const moments = document.querySelectorAll('.moment');
    const photoFrames = document.querySelectorAll('.photo-frame');
    const poemContent = document.querySelector('.poem-content');
    
    // Verifica si los elementos existen
    if (!poemContent) {
        console.warn('No se encontró el contenido del poema para la animación de scroll');
        return;
    }
    
    // Configuración del Intersection Observer
    const observerOptions = {
        root: null,           // Usa el viewport como contenedor
        rootMargin: '0px',   // Sin margen adicional
        threshold: 0.1        // Activa cuando al menos 10% del elemento es visible
    };
    
    /**
     * Callback que se ejecuta cuando los elementos entran o salen del viewport
     * @param {IntersectionObserverEntry[]} entries - Elementos observados
     * @param {IntersectionObserver} observer - Instancia del observador
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento es visible en el viewport
            if (entry.isIntersecting) {
                // Añade la clase que activa la animación
                entry.target.classList.add('visible');
                // Deja de observar el elemento una vez que se ha revelado
                observer.unobserve(entry.target);
                
                // Registra para depuración
                console.log(`Elemento revelado: ${entry.target.className}`);
            }
        });
    };
    
    // Crea el observador con la configuración y callback definidos
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Configura y observa cada momento en la galería
    moments.forEach((moment, index) => {
        // Configura el estado inicial (invisible y desplazado)
        moment.style.opacity = '0';
        moment.style.transform = 'translateY(20px)';
        // Añade un retraso progresivo para crear un efecto cascada
        moment.style.transitionDelay = `${index * 0.1}s`;
        // Comienza a observar el elemento
        observer.observe(moment);
    });
    
    // Configura y observa cada marco de foto en la sección de infancia
    photoFrames.forEach((frame, index) => {
        // Configura el estado inicial (invisible y desplazado)
        frame.style.opacity = '0';
        frame.style.transform = 'translateY(20px)';
        // Añade un retraso progresivo para crear un efecto cascada
        frame.style.transitionDelay = `${index * 0.2}s`;
        // Comienza a observar el elemento
        observer.observe(frame);
    });
    
    // Configura y observa el contenido del poema
    poemContent.style.opacity = '0';
    poemContent.style.transform = 'translateY(20px)';
    observer.observe(poemContent);
    
    // Añade los estilos CSS necesarios para las transiciones
    addRevealStyles();
    
    console.log('Efecto de revelación al scroll inicializado');
}

/**
 * Añade los estilos CSS necesarios para las animaciones de revelación
 * Se hace mediante JavaScript para mantener los estilos relacionados con
 * la funcionalidad junto al código que los utiliza
 */
function addRevealStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos para elementos que se revelan al hacer scroll */
        .moment, .photo-frame, .poem-content {
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .moment.visible, .photo-frame.visible, .poem-content.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Estilos para la animación inicial de las secciones principales */
        header, .dedication, .gallery, .childhood-photos, .poem {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Configura interactividad adicional para elementos de la página
 * Añade efectos hover y eventos de clic para mejorar la experiencia de usuario
 */
function setupInteractivity() {
    // Añade efectos de hover a los momentos
    const moments = document.querySelectorAll('.moment');
    moments.forEach(moment => {
        // Añade un efecto de brillo al pasar el ratón
        moment.addEventListener('mouseenter', () => {
            moment.style.boxShadow = '0 8px 25px rgba(231, 84, 128, 0.3)';
        });
        
        moment.addEventListener('mouseleave', () => {
            moment.style.boxShadow = '';
        });
        
        // Añade un efecto de clic para destacar el momento
        moment.addEventListener('click', () => {
            // Elimina la clase 'active' de todos los momentos
            moments.forEach(m => m.classList.remove('active'));
            // Añade la clase 'active' al momento clicado
            moment.classList.add('active');
        });
    });
    
    // Añade un efecto especial al título principal
    const title = document.querySelector('.title');
    if (title) {
        title.addEventListener('click', () => {
            // Añade una animación de latido al hacer clic en el título
            title.style.animation = 'heartbeat 1.5s ease-in-out';
            
            // Elimina la animación después de que termine
            setTimeout(() => {
                title.style.animation = '';
            }, 1500);
        });
    }
    
    // Añade interactividad a la firma
    const signature = document.querySelector('.signature');
    if (signature) {
        signature.addEventListener('mouseenter', () => {
            signature.style.transform = 'scale(1.05)';
            signature.style.color = '#e75480';
        });
        
        signature.addEventListener('mouseleave', () => {
            signature.style.transform = '';
            signature.style.color = '';
        });
    }
    
    console.log('Interactividad adicional configurada');
}

/**
 * Crea los tulipanes animados en el fondo de la página
 * Genera elementos de tulipán con diferentes tamaños, colores y posiciones
 * para crear un efecto visual atractivo pero no distrayente
 */
function createBackgroundTulips() {
    // Obtiene el contenedor para los tulipanes de fondo
    const tulipBackground = document.getElementById('tulip-background');
    
    // Número de tulipanes a crear
    const tulipCount = 15;
    
    // Tipos de tulipanes disponibles
    const tulipTypes = [
        { size: 'bg-tulip-1', color: 'bg-tulip-pink' },
        { size: 'bg-tulip-2', color: 'bg-tulip-purple' },
        { size: 'bg-tulip-3', color: 'bg-tulip-orange' }
    ];
    
    // Crea los tulipanes y los añade al contenedor
    for (let i = 0; i < tulipCount; i++) {
        // Selecciona un tipo de tulipán aleatorio
        const typeIndex = Math.floor(Math.random() * tulipTypes.length);
        const type = tulipTypes[typeIndex];
        
        // Crea el elemento del tulipán
        const tulip = document.createElement('div');
        tulip.className = `bg-tulip ${type.size} ${type.color}`;
        
        // Añade las hojas al tulipán
        const leafLeft = document.createElement('div');
        leafLeft.className = 'leaf-left';
        tulip.appendChild(leafLeft);
        
        const leafRight = document.createElement('div');
        leafRight.className = 'leaf-right';
        tulip.appendChild(leafRight);
        
        // Posiciona el tulipán aleatoriamente en la pantalla
        const posX = Math.random() * 100; // Posición horizontal (0-100%)
        const posY = Math.random() * 100; // Posición vertical (0-100%)
        tulip.style.left = `${posX}%`;
        tulip.style.top = `${posY}%`;
        
        // Añade un retraso aleatorio a la animación para que no todos se muevan al mismo tiempo
        const delay = Math.random() * 5; // Retraso entre 0 y 5 segundos
        tulip.style.animationDelay = `${delay}s`;
        
        // Añade el tulipán al contenedor
        tulipBackground.appendChild(tulip);
    }
    
    console.log('Tulipanes de fondo creados:', tulipCount);
}

/**
 * Inicializa el efecto parallax para los tulipanes de fondo durante el scroll
 * Los tulipanes se mueven a diferentes velocidades creando una sensación de profundidad
 */
function initBackgroundParallax() {
    // Selecciona todos los tulipanes de fondo
    const bgTulips = document.querySelectorAll('.bg-tulip');
    
    // Si no hay tulipanes, salimos de la función
    if (bgTulips.length === 0) {
        console.warn('No se encontraron tulipanes de fondo para el efecto parallax');
        return;
    }
    
    // Posición inicial del scroll
    let lastScrollY = window.scrollY;
    
    // Configura el evento de scroll
    window.addEventListener('scroll', () => {
        // Calcula la dirección y distancia del scroll
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;
        lastScrollY = scrollY;
        
        // Aplica el efecto parallax a cada tulipán
        bgTulips.forEach((tulip, index) => {
            // Calcula un factor de velocidad único para cada tulipán
            // basado en su índice para crear diferentes capas de profundidad
            const speedFactor = 0.05 + (index % 3) * 0.02;
            
            // Obtiene la posición actual
            const currentY = parseFloat(tulip.style.transform.replace('translateY(', '').replace('px)', '') || 0);
            
            // Calcula la nueva posición con el efecto parallax
            const newY = currentY - (scrollDelta * speedFactor);
            
            // Aplica la transformación
            tulip.style.transform = `translateY(${newY}px)`;
        });
    }, { passive: true }); // Optimización de rendimiento
    
    console.log('Efecto parallax para tulipanes de fondo inicializado');
}

/**
 * Inicializa el sistema de temas (claro/oscuro) con animaciones mejoradas
 * Verifica la preferencia guardada del usuario, aplica el tema correspondiente
 * y configura el evento para cambiar entre temas con transiciones visuales
 */
function initThemeSystem() {
    // Selecciona el toggle switch y su contenedor
    const themeSwitch = document.getElementById('theme-switch');
    const themeContainer = document.querySelector('.theme-toggle-container');
    
    // Si no existe el switch, salimos de la función
    if (!themeSwitch) {
        console.warn('No se encontró el switch de tema');
        return;
    }
    
    // Verifica si hay una preferencia guardada en localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Aplica el tema guardado o usa la preferencia del sistema
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        applyTheme('dark');
        themeSwitch.checked = true;
    } else {
        applyTheme('light');
        themeSwitch.checked = false;
    }
    
    // Función para aplicar el tema con animación
    function applyTheme(theme, animate = false) {
        // Aplica el atributo de tema al documento
        document.documentElement.setAttribute('data-theme', theme);
        
        // Si se solicita animación, añade efectos visuales
        if (animate) {
            // Añade clase para la animación de transición
            document.body.classList.add('theme-transition');
            
            // Efecto de florecimiento para el botón
            const slider = document.querySelector('.slider');
            slider.classList.add('theme-changing');
            
            // Efecto de rotación para el contenedor
            themeContainer.style.transform = theme === 'dark' ? 
                'scale(1.2) rotate(10deg)' : 'scale(1.2) rotate(-10deg)';
            
            // Elimina las clases de animación después de completarse
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
                slider.classList.remove('theme-changing');
                themeContainer.style.transform = '';
            }, 800);
            
            // Añade un efecto de brillo temporal al fondo
            const tulipBackground = document.getElementById('tulip-background');
            if (tulipBackground) {
                const glowEffect = document.createElement('div');
                glowEffect.className = 'theme-change-glow';
                glowEffect.style.backgroundColor = theme === 'dark' ? 
                    'rgba(142, 68, 173, 0.2)' : 'rgba(231, 84, 128, 0.2)';
                tulipBackground.appendChild(glowEffect);
                
                // Elimina el efecto después de la animación
                setTimeout(() => {
                    tulipBackground.removeChild(glowEffect);
                }, 1000);
            }
        }
    }
    
    // Añade estilos CSS para las animaciones de cambio de tema
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .theme-transition * {
            transition: background-color 0.8s ease, color 0.8s ease, border-color 0.8s ease, box-shadow 0.8s ease !important;
        }
        
        .slider.theme-changing:after {
            opacity: 0.8 !important;
            transform: translateX(-50%) scale(1.5) !important;
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        
        .theme-change-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            animation: themeGlow 1s ease-out forwards;
            pointer-events: none;
        }
        
        @keyframes themeGlow {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Configura el evento para cambiar el tema con animaciones
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            // Cambia a tema oscuro con animación
            applyTheme('dark', true);
            localStorage.setItem('theme', 'dark');
        } else {
            // Cambia a tema claro con animación
            applyTheme('light', true);
            localStorage.setItem('theme', 'light');
        }
    });
    
    // También escucha cambios en la preferencia del sistema
    prefersDarkScheme.addEventListener('change', (e) => {
        // Solo cambia automáticamente si el usuario no ha establecido una preferencia
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                applyTheme('dark', true);
                themeSwitch.checked = true;
            } else {
                applyTheme('light', true);
                themeSwitch.checked = false;
            }
        }
    });
    
    console.log('Sistema de temas inicializado con animaciones mejoradas');
}

/**
 * Abre una ventana modal para mostrar una imagen o video
 * @param {string} mediaPath - Ruta del archivo multimedia (imagen o video)
 * @param {string} title - Título que se mostrará en la modal
 * @param {boolean} isVideo - Indica si el contenido es un video
 */
function openModal(mediaPath, title, isVideo = false) {
    const modal = document.getElementById('mediaModal');
    const modalTitle = document.getElementById('modalTitle');
    const mediaContainer = document.getElementById('modalMediaContainer');
    
    // Limpia el contenedor de contenido anterior
    mediaContainer.innerHTML = '';
    
    // Establece el título
    modalTitle.textContent = title;
    
    // Crea y configura el elemento multimedia apropiado
    if (isVideo) {
        const video = document.createElement('video');
        video.src = mediaPath;
        video.controls = true;
        video.autoplay = false;
        video.className = 'modal-media';
        mediaContainer.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = mediaPath;
        img.alt = title;
        img.className = 'modal-media';
        mediaContainer.appendChild(img);
    }
    
    // Muestra la modal con una animación suave
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Configura el cierre al hacer clic fuera de la modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/**
 * Cierra la ventana modal
 */
function closeModal() {
    const modal = document.getElementById('mediaModal');
    const mediaContainer = document.getElementById('modalMediaContainer');
    
    // Elimina la clase show para iniciar la animación de salida
    modal.classList.remove('show');
    
    // Espera a que termine la animación antes de ocultar completamente
    setTimeout(() => {
        modal.style.display = 'none';
        // Limpia el contenedor
        mediaContainer.innerHTML = '';
    }, 300);
}

/**
 * Inicializa el carrusel tipo libro con imágenes de Ana
 * Configura la navegación entre imágenes con efecto de pasar página
 * y funcionalidad de bucle para recorrer todas las imágenes
 */
function initBookCarousel() {
    // Datos para el carrusel (imágenes y mensajes)
    const carouselData = [
        {
            image: 'img/A/A - 1.jpg',
            message: 'Cada vez que veo tu sonrisa, mi corazón florece como un tulipán en primavera.'
        },
        {
            image: 'img/A/A - 2.jpg',
            message: 'Tus ojos son el jardín donde mis sueños encuentran su hogar, Ana hermosa.'
        },
        {
            image: 'img/A/A - 3.jpg',
            message: 'Como un tulipán que busca la luz, yo busco tu mirada cada día.'
        },
        {
            image: 'img/A/A - 4.jpg',
            message: 'Eres la melodía que hace que mi corazón baile al ritmo del amor.'
        },
        {
            image: 'img/A/A - 5.jpg',
            message: 'En cada pétalo de mi corazón está escrito tu nombre, mi dulce Ana.'
        },
        {
            image: 'img/A/A - 6.jpg',
            message: 'Contigo, cada día es primavera y cada momento florece en mi memoria.'
        }
    ];
    
    // Elementos del DOM
    const book = document.querySelector('.book');
    const pageLeft = document.querySelector('.page-left .page-content');
    const pageRight = document.querySelector('.page-right .page-content');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Si no se encuentran los elementos necesarios, salimos de la función
    if (!book || !pageLeft || !pageRight || !prevBtn || !nextBtn) {
        console.warn('No se encontraron los elementos necesarios para el carrusel tipo libro');
        return;
    }
    
    // Índice actual del carrusel
    let currentIndex = 0;
    let isAnimating = false;
    
    // Función para actualizar el contenido de las páginas
    function updatePages() {
        // Actualiza la página izquierda (imagen)
        pageLeft.innerHTML = `<img src="${carouselData[currentIndex].image}" alt="Ana" class="book-image">`;
        
        // Actualiza la página derecha (mensaje)
        pageRight.innerHTML = `<p class="book-message">${carouselData[currentIndex].message}</p>`;
    }
    
    // Función para ir a la página anterior
    function goToPrevPage() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Efecto de página volteándose hacia la derecha
        book.classList.add('turning-right');
        
        // Después de un breve retraso, actualizamos el índice y el contenido
        setTimeout(() => {
            // Actualizamos el índice (con bucle)
            currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
            
            // Actualizamos el contenido
            updatePages();
            
            // Quitamos la clase de animación
            book.classList.remove('turning-right');
            isAnimating = false;
        }, 400); // Mitad del tiempo de la transición
    }
    
    // Función para ir a la página siguiente
    function goToNextPage() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Efecto de página volteándose hacia la izquierda
        book.classList.add('turning-left');
        
        // Después de un breve retraso, actualizamos el índice y el contenido
        setTimeout(() => {
            // Actualizamos el índice (con bucle)
            currentIndex = (currentIndex + 1) % carouselData.length;
            
            // Actualizamos el contenido
            updatePages();
            
            // Quitamos la clase de animación
            book.classList.remove('turning-left');
            isAnimating = false;
        }, 400); // Mitad del tiempo de la transición
    }
    
    // Configuramos los eventos de los botones
    prevBtn.addEventListener('click', goToPrevPage);
    nextBtn.addEventListener('click', goToNextPage);
    
    // Inicializamos el carrusel con el primer elemento
    updatePages();
    
    // Añadimos efectos visuales a los botones
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
        
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'scale(1.1) rotate(5deg)';
        });
    });
    
    // Añadimos interacción con el teclado para accesibilidad
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrevPage();
        } else if (e.key === 'ArrowRight') {
            goToNextPage();
        }
    });
    
    console.log('Carrusel tipo libro inicializado con', carouselData.length, 'imágenes');
}

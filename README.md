# 🌷 Para mi tulipán - Página web dedicada

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](LICENSE)

## 📖 Descripción del proyecto

Una página web dedicada creada con amor por Diego Yaqueno para Ana Rosero, desarrollada por Antony Salcedo. La temática gira en torno a los tulipanes, simbolizando belleza y amor.

Este proyecto es una expresión digital de cariño que combina elementos visuales atractivos con interactividad significativa. La página incluye:
- Galería fotográfica interactiva con ventana modal
- Carrusel tipo libro con imágenes y mensajes
- Sección de videos dedicados con reproductor personalizado
- Diseño responsive para todos los dispositivos
- Recuerdos de infancia en marcos decorativos

## ✨ Características principales

### 🎨 Diseño visual
- Animaciones CSS de tulipanes fluidas y atractivas
- Efectos parallax en elementos decorativos
- Transiciones suaves entre secciones
- Tema de color personalizable mediante variables CSS
- Marcos decorativos para fotos de infancia

### 💡 Funcionalidades
- Modo claro/oscuro con persistencia de preferencia
- Galería modal para visualización de imágenes y videos
- Carrusel tipo libro con navegación intuitiva
- Reproductor de video personalizado
- Efectos al hacer scroll usando Intersection Observer API

### 📱 Compatibilidad
- Diseño completamente responsive
- Optimizado para móviles, tablets y desktop
- Soporte para navegadores modernos

## 🛠️ Tecnologías utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Animaciones, flexbox, grid y diseño responsive
- **JavaScript vanilla**: Interactividad sin dependencias

### Recursos externos
- **Google Fonts**: Dancing Script (para títulos) y Montserrat (para texto)
- **Font Awesome**: Iconos decorativos

## 🚀 Instalación y uso

### Requisitos previos
- Navegador web moderno (Chrome, Firefox, Edge)
- Node.js (opcional, para servidor local)

### Pasos de instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tony-ssr/PageForMyLittleTulip.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd PageForMyLittleTulip
   ```
3. Abre `index.html` en tu navegador o usa un servidor local:
   ```bash
   npx serve
   ```

## 🎨 Personalización

Puedes editar las siguientes variables CSS en `:root` (archivo `styles.css`) para cambiar la apariencia:
```css
:root {
    /* Colores principales */
    --color-primary: #e75480;  /* Color de acento principal */
    --color-secondary: #8e44ad; /* Color secundario */
    --color-accent: #4CAF50;    /* Color de realce */
    
    /* Colores de fondo */
    --color-background: #fff9f9; /* Fondo claro */
    --color-background-dark: #1a1a1a; /* Fondo oscuro */
    
    /* Colores de texto */
    --color-text: #333;         /* Texto claro */
    --color-text-dark: #f0f0f0; /* Texto oscuro */
}
```

## 📂 Estructura completa del proyecto

```
Para mi tulipan/
├── index.html            # Página principal
├── css/
│   └── styles.css        # Estilos principales
├── js/
│   └── script.js        # Lógica de la aplicación
├── img/
│   ├── A&D/             # Fotos de ambos
│   ├── A/               # Fotos de Ana
│   └── MC/              # Fotos de Minecraft
├── vdo/
│   ├── A&D/             # Videos de momentos juntos
│   └── A/               # Videos dedicados
├── .gitignore           # Archivos ignorados por git
├── LICENSE              # Licencia MIT
└── README.md            # Este archivo
```

## 🖼️ Características de la galería

### Modal interactivo
- Visualización de imágenes a pantalla completa
- Soporte para reproducción de videos
- Títulos descriptivos para cada contenido
- Botón de cierre intuitivo

### Carrusel tipo libro
- Navegación suave entre páginas
- Combinación de imágenes y mensajes
- Controles intuitivos (anterior/siguiente)
- Animaciones de transición fluidas

## 🛠️ Guía de desarrollo

### Estructura del código
- **HTML**: Semántico y accesible
- **CSS**: Organizado por componentes
- **JavaScript**: Modular y bien comentado

### Convenciones
- Nombres descriptivos en inglés
- Comentarios en español
- Indentación con 4 espacios

## 🤝 Cómo contribuir

1. Haz un fork del repositorio
2. Crea una rama (`git checkout -b feature/nueva-mejora`)
3. Haz commit de tus cambios (`git commit -m 'Añade nueva mejora'`)
4. Sube los cambios (`git push origin feature/nueva-mejora`)
5. Abre un Pull Request

## 📄 Licencia

[MIT](LICENSE) © Diego Yaqueno y Antony Salcedo

---

Creado con ❤️ por Diego Yaqueno para Ana Rosero, mi hermoso tulipán.
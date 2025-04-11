/**
 * Script para el reproductor de música
 * Implementa funcionalidades de reproducción, aleatorio, bucle, selección de canciones,
 * control de volumen y barra de progreso interactiva
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del reproductor
    const audio = new Audio();
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const shuffleBtn = document.getElementById('shuffle');
    const repeatBtn = document.getElementById('repeat');
    const muteBtn = document.getElementById('mute');
    const playlistToggle = document.getElementById('playlist-toggle');
    const playlist = document.getElementById('playlist');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const songCover = document.getElementById('song-cover');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.getElementById('progress');
    const volumeBar = document.querySelector('.volume-bar');
    const volume = document.getElementById('volume');
    const playlistItems = document.querySelectorAll('.playlist li');
    
    // Estado del reproductor
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    let isMuted = false;
    let currentVolume = 1;
    let currentSongIndex = 0;
    let playlistVisible = false;
    
    // Lista de canciones
    const songs = Array.from(playlistItems).map(item => ({
        src: item.getAttribute('data-src'),
        cover: item.getAttribute('data-cover'),
        title: item.getAttribute('data-title'),
        artist: item.getAttribute('data-artist')
    }));
    
    // Inicializar reproductor
    function initPlayer() {
        // Cargar primera canción
        loadSong(currentSongIndex);
        
        // Establecer volumen inicial
        audio.volume = currentVolume;
        updateVolumeUI();
        
        // Eventos de audio
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleSongEnd);
        audio.addEventListener('canplay', updateDuration);
        
        // Eventos de controles
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        shuffleBtn.addEventListener('click', toggleShuffle);
        repeatBtn.addEventListener('click', toggleRepeat);
        muteBtn.addEventListener('click', toggleMute);
        playlistToggle.addEventListener('click', togglePlaylist);
        
        // Eventos de barra de progreso
        progressBar.addEventListener('click', setProgress);
        
        // Eventos de volumen
        volumeBar.addEventListener('click', setVolume);
        
        // Eventos de lista de reproducción
        playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                togglePlay();
                togglePlaylist();
            });
        });
    }
    
    // Cargar canción
    function loadSong(index) {
        const song = songs[index];
        audio.src = song.src;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        songCover.src = song.cover;
        
        // Actualizar clase activa en la lista
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
    }
    
    // Reproducir/Pausar
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    // Reproducir canción
    function playSong() {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playBtn.setAttribute('title', 'Pausar');
        audio.play();
        
        // Añadir animación al cover
        songCover.style.animation = 'rotate 20s linear infinite';
    }
    
    // Pausar canción
    function pauseSong() {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.setAttribute('title', 'Reproducir');
        audio.pause();
        
        // Pausar animación del cover
        songCover.style.animationPlayState = 'paused';
    }
    
    // Canción anterior
    function prevSong() {
        if (isShuffle) {
            randomSong();
        } else {
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentSongIndex = songs.length - 1;
            }
            loadSong(currentSongIndex);
        }
        
        if (isPlaying) {
            playSong();
        }
    }
    
    // Siguiente canción
    function nextSong() {
        if (isShuffle) {
            randomSong();
        } else {
            currentSongIndex++;
            if (currentSongIndex > songs.length - 1) {
                currentSongIndex = 0;
            }
            loadSong(currentSongIndex);
        }
        
        if (isPlaying) {
            playSong();
        }
    }
    
    // Canción aleatoria
    function randomSong() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === currentSongIndex && songs.length > 1);
        
        currentSongIndex = newIndex;
        loadSong(currentSongIndex);
    }
    
    // Activar/Desactivar reproducción aleatoria
    function toggleShuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
        shuffleBtn.setAttribute('title', isShuffle ? 'Desactivar aleatorio' : 'Reproducción aleatoria');
    }
    
    // Activar/Desactivar repetición
    function toggleRepeat() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
        repeatBtn.setAttribute('title', isRepeat ? 'Desactivar repetición' : 'Repetir');
    }
    
    // Manejar fin de canción
    function handleSongEnd() {
        if (isRepeat) {
            audio.currentTime = 0;
            playSong();
        } else {
            nextSong();
        }
    }
    
    // Actualizar barra de progreso
    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Actualizar tiempo actual
        currentTimeEl.textContent = formatTime(currentTime);
    }
    
    // Actualizar duración
    function updateDuration() {
        durationEl.textContent = formatTime(audio.duration);
    }
    
    // Establecer progreso al hacer clic
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    
    // Activar/Desactivar silencio
    function toggleMute() {
        isMuted = !isMuted;
        audio.muted = isMuted;
        
        if (isMuted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            muteBtn.setAttribute('title', 'Activar sonido');
            volume.style.width = '0%';
        } else {
            updateVolumeIcon();
            volume.style.width = `${currentVolume * 100}%`;
        }
    }
    
    // Establecer volumen
    function setVolume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        currentVolume = clickX / width;
        
        // Limitar volumen entre 0 y 1
        currentVolume = Math.max(0, Math.min(1, currentVolume));
        
        audio.volume = currentVolume;
        updateVolumeUI();
        
        // Si estaba en silencio, desactivar
        if (isMuted && currentVolume > 0) {
            toggleMute();
        }
    }
    
    // Actualizar UI de volumen
    function updateVolumeUI() {
        volume.style.width = `${currentVolume * 100}%`;
        updateVolumeIcon();
    }
    
    // Actualizar icono de volumen según nivel
    function updateVolumeIcon() {
        if (currentVolume >= 0.5) {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else if (currentVolume > 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
        }
        muteBtn.setAttribute('title', 'Silenciar');
    }
    
    // Mostrar/Ocultar lista de reproducción
    function togglePlaylist() {
        playlistVisible = !playlistVisible;
        playlist.classList.toggle('show', playlistVisible);
    }
    
    // Formatear tiempo (segundos a MM:SS)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Iniciar reproductor
    initPlayer();
    
    // Añadir animación CSS para la rotación del cover
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});
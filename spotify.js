const SPOTIFY_WORKER_URL = 'https://spotify.shohan.workers.dev';
const UPDATE_INTERVAL = 60000; // Update every minute
const PROGRESS_UPDATE_INTERVAL = 1000; // Update progress bar every second

let progressInterval;

function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgress(duration, progress) {
    if (progressInterval) clearInterval(progressInterval);
    
    const progressBar = document.getElementById('progress');
    let currentProgress = progress;
    
    const updateProgressBar = () => {
        if (currentProgress >= duration) {
            clearInterval(progressInterval);
            setTimeout(updatePlayer, 2000);
            return;
        }
        
        const percentage = Math.min((currentProgress / duration) * 100, 100);
        progressBar.style.width = `${percentage}%`;
        
        document.getElementById('player-status').textContent = 
            `Now Playing (${formatTime(currentProgress)} / ${formatTime(duration)})`;
            
        currentProgress += PROGRESS_UPDATE_INTERVAL;
    };

    // Initial update
    updateProgressBar();
    
    // Start interval for continuous updates
    progressInterval = setInterval(updateProgressBar, PROGRESS_UPDATE_INTERVAL);
}

async function updatePlayer() {
    try {
        const response = await fetch(`${SPOTIFY_WORKER_URL}/get-now-playing`);
        const data = await response.json();
        
        if (data.ERROR) {
            document.getElementById('song-title').textContent = 'Not Available';
            document.getElementById('artist-name').textContent = 'No song data';
            document.getElementById('player-status').textContent = 'Unable to fetch song data';
            document.getElementById('progress').style.width = '0%';
            document.getElementById('album-art').src = '/api/placeholder/150/150';
            if (progressInterval) clearInterval(progressInterval);
            return;
        }

        const { item, is_playing, progress_ms, last_played } = data;
        
        // Update only if song has changed or play state has changed
        const currentSong = document.getElementById('song-title').textContent;
        const currentArtist = document.getElementById('artist-name').textContent;
        
        if (currentSong !== item.name || currentArtist !== item.artists[0].name || 
            (document.getElementById('player-status').textContent.includes('Paused') !== !is_playing)) {
            
            document.getElementById('song-title').textContent = item.name;
            document.getElementById('artist-name').textContent = item.artists[0].name;
            document.getElementById('album-art').src = item.album.images[0].url;
        }
        
        if (last_played) {
            if (progressInterval) clearInterval(progressInterval);
            document.getElementById('progress').style.width = '100%';
            document.getElementById('player-status').textContent = '⌛ Last Played';
        } else if (is_playing) {
            updateProgress(item.duration_ms, progress_ms);
        } else {
            if (progressInterval) clearInterval(progressInterval);
            document.getElementById('progress').style.width = `${(progress_ms / item.duration_ms) * 100}%`;
            document.getElementById('player-status').textContent = '⏸ Paused';
        }
    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        document.getElementById('player-status').textContent = 'Unable to connect to Spotify';
        document.getElementById('song-title').textContent = 'Connection Error';
        document.getElementById('artist-name').textContent = 'Please try again later';
        if (progressInterval) clearInterval(progressInterval);
    }
}

// Initial update
updatePlayer();

// Regular updates
setInterval(updatePlayer, UPDATE_INTERVAL);
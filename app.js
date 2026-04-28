// ================================================================
//  app.js — BeatFlow Internal Music Player
//  Assignment 4: OOP + Multimedia Elements
//
//  Name:   ___________________________
//  Date:   ___________________________
// ================================================================
//
//  INSTRUCTIONS:
//  Complete all 4 parts below in order.
//  Do NOT modify index.html or styles.css.
//  Test in a browser after completing each part.
//
//  RECOMMENDED ORDER: Part 1 → Part 2 → Part 3 → Part 4
// ================================================================


// ================================================================
//  SAMPLE TRACK DATA — Do not modify
//  Each track object has: title, artist, genre, src (audio URL)
//  Note: src uses free royalty-free samples from pixabay
// ================================================================

const TRACKS = [
    {
        title:  "Neon Drift",
        artist: "The Synthwave Collective",
        genre:  "Electronic",
        src:    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title:  "Rooftop Sessions",
        artist: "Juno Park",
        genre:  "Lo-Fi",
        src:    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title:  "Midnight Raga",
        artist: "Arjun Sharma",
        genre:  "Fusion",
        src:    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        title:  "City Pulse",
        artist: "Nadia Voss",
        genre:  "Pop",
        src:    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        title:  "Bass Garden",
        artist: "The Synthwave Collective",
        genre:  "Electronic",
        src:    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        title:  "Still Waters",
        artist: "Juno Park",
        genre:  "Lo-Fi",
        src:    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
];


// ================================================================
//  PART 1 — The Track Class  (5 points)
//
//  TODO: Define a class called Track
//
//  Properties (set via constructor):
//    - title    (string)
//    - artist   (string)
//    - genre    (string)
//    - src      (string — audio URL)
//    - _playCount  (number, private convention — start at 0)
//
//  Getter:
//    - get playCount()  → returns _playCount
//
//  Methods:
//    - incrementPlay()  → adds 1 to _playCount
//    - getInfo()        → returns a formatted string:
//                         '"Title" by Artist [Genre]'
//    - toString()       → returns the same as getInfo()
// ================================================================

// YOUR CODE HERE
class Track {
    constructor(title, artist, genre, src) {
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.src = src;
        this._playCount = 0;
    }

    get playCount() {
        return this._playCount;
    }

    incrementPlay() {
        this._playCount += 1;
    }

    getInfo() {
        return `"${this.title}" by ${this.artist} [${this.genre}]`;
    }

    toString() {
        return this.getInfo();
    }
}




// ================================================================
//  PART 2 — The MusicPlayer Class  (6 points)
//
//  TODO: Define a class called MusicPlayer
//
//  Constructor receives: audioElementId (string)
//    - this.audio      → document.getElementById(audioElementId)
//    - this.tracks     → empty array []
//    - this.currentIndex → -1
//    - this.isPlaying  → false
//
//  Methods:
//
//  loadTracks(trackDataArray)
//    - Receives the TRACKS array above
//    - For each item, create a new Track object and push it
//      into this.tracks
//    - Call renderTrackList() after loading
//    - Call addLog(`Loaded ${this.tracks.length} tracks`) 
//
//  play(index)
//    - Set this.currentIndex = index
//    - Get the track: const track = this.tracks[index]
//    - Set this.audio.src = track.src
//    - Call this.audio.play()
//    - Set this.isPlaying = true
//    - Call track.incrementPlay()
//    - Call updatePlayerUI(track)
//    - Call addLog(`▶ Now playing: ${track.getInfo()}`)
//
//  pause()
//    - Call this.audio.pause()
//    - Set this.isPlaying = false
//    - Call addLog('⏸ Paused')
//    - Update play button text to '▶'
//    - Remove 'playing' class from #playBtn and #playerArt
//
//  next()
//    - Calculate nextIndex: (this.currentIndex + 1) % this.tracks.length
//    - Call this.play(nextIndex)
//
//  prev()
//    - Calculate prevIndex: wrap backwards using tracks.length
//      Hint: (this.currentIndex - 1 + this.tracks.length) % this.tracks.length
//    - Call this.play(prevIndex)
//
//  setVolume(value)
//    - Set this.audio.volume = value
//    - Update #volPct text to show the percentage (Math.round(value * 100) + '%')
//    - Call addLog(`🔊 Volume set to ${Math.round(value * 100)}%`)
//
//  getTrackCount()
//    - Returns this.tracks.length
// ================================================================

// YOUR CODE HERE
class MusicPlayer {
    constructor(audioElementId) {
        this.audio = document.getElementById(audioElementId);
        this.tracks = [];
        this.currentIndex = -1;
        this.isPlaying = false;
    }

    loadTracks(trackDataArray) {
        this.tracks = [];

        trackDataArray.forEach(trackData => {
            this.tracks.push(
                new Track(trackData.title, trackData.artist, trackData.genre, trackData.src)
            );
        });

        renderTrackList();
        addLog(`Loaded ${this.tracks.length} tracks`);
    }

    play(index) {
        if (this.tracks.length === 0 || index < 0 || index >= this.tracks.length) {
            return;
        }

        this.currentIndex = index;
        const track = this.tracks[index];

        this.audio.src = track.src;
        this.audio.play();
        this.isPlaying = true;
        track.incrementPlay();
        updatePlayerUI(track);
        addLog(`▶ Now playing: ${track.getInfo()}`);
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        addLog('⏸ Paused');
        document.getElementById('playBtn').textContent = '▶';
        document.getElementById('playBtn').classList.remove('playing');
        document.getElementById('playerArt').classList.remove('playing');
    }

    next() {
        if (this.tracks.length === 0) {
            return;
        }

        const nextIndex = (this.currentIndex + 1) % this.tracks.length;
        this.play(nextIndex);
    }

    prev() {
        if (this.tracks.length === 0) {
            return;
        }

        const prevIndex = (this.currentIndex - 1 + this.tracks.length) % this.tracks.length;
        this.play(prevIndex);
    }

    setVolume(value) {
        this.audio.volume = value;
        document.getElementById('volPct').textContent = `${Math.round(value * 100)}%`;
        addLog(`🔊 Volume set to ${Math.round(value * 100)}%`);
    }

    getTrackCount() {
        return this.tracks.length;
    }
}




// ================================================================
//  PART 3 — The Playlist Class  (5 points)
//  (Extends Track management — uses inheritance)
//
//  TODO: Define a class called Playlist
//
//  Constructor receives: name (string)
//    - this.name   → the playlist name
//    - this.tracks → empty array []
//
//  Methods:
//
//  addTrack(trackObject)
//    - Push the Track object into this.tracks
//    - Call addLog(`Added "${trackObject.title}" to playlist "${this.name}"`)
//
//  removeTrack(title)
//    - Filter out the track whose title matches (case-insensitive)
//    - Update this.tracks with the filtered result
//    - Call addLog(`Removed "${title}" from playlist "${this.name}"`)
//
//  getTracks()
//    - Returns this.tracks array
//
//  getSummary()
//    - Returns a string:
//      '${this.name} — ${this.tracks.length} track(s)'
//
//  Then:
//    - Create one Playlist instance called "My Favourites"
//    - Add the first 3 tracks from the player's track list to it
//      after the player is initialised (see Part 4 wiring below)
//    - Call renderPlaylists() to show it in the sidebar
// ================================================================

// YOUR CODE HERE
class Playlist {
    constructor(name) {
        this.name = name;
        this.tracks = [];
    }

    addTrack(trackObject) {
        this.tracks.push(trackObject);
        addLog(`Added "${trackObject.title}" to playlist "${this.name}"`);
    }

    removeTrack(title) {
        this.tracks = this.tracks.filter(
            track => track.title.toLowerCase() !== title.toLowerCase()
        );
        addLog(`Removed "${title}" from playlist "${this.name}"`);
    }

    getTracks() {
        return this.tracks;
    }

    getSummary() {
        return `${this.name} — ${this.tracks.length} track(s)`;
    }
}




// ================================================================
//  PART 4 — Wiring the UI  (4 points)
//
//  TODO: Connect the classes above to the DOM
//
//  1. Create a MusicPlayer instance:
//       const player = new MusicPlayer('audioPlayer')
//
//  2. Call player.loadTracks(TRACKS)
//
//  3. Wire up #playBtn click:
//       - If player.isPlaying → call player.pause()
//       - Else if currentIndex === -1 → call player.play(0)
//       - Else → call player.play(player.currentIndex)
//
//  4. Wire up #nextBtn → call player.next()
//
//  5. Wire up #prevBtn → call player.prev()
//
//  6. Wire up #volumeSlider input event:
//       - Call player.setVolume(parseFloat(slider.value))
//
//  7. Wire up #clearLogBtn → clear the log (see addLog helper below)
//
//  8. Wire up #createPlaylistBtn:
//       - Use prompt() to ask for a playlist name
//       - If a name is given, create a new Playlist and call renderPlaylists()
//
//  9. Wire up each track item in the sidebar:
//       (Already handled inside renderTrackList — but make sure your
//        play() method marks the active track correctly)
//
//  After wiring:
//    - Create the "My Favourites" playlist (see Part 3)
//    - Add player.tracks[0], [1], [2] to it
//    - Call renderPlaylists()
// ================================================================

// YOUR CODE HERE
const player = new MusicPlayer('audioPlayer');
player.loadTracks(TRACKS);

document.getElementById('playBtn').addEventListener('click', () => {
    if (player.isPlaying) {
        player.pause();
    } else if (player.currentIndex === -1) {
        player.play(0);
    } else {
        player.play(player.currentIndex);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    player.next();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    player.prev();
});

document.getElementById('volumeSlider').addEventListener('input', event => {
    player.setVolume(parseFloat(event.target.value));
});

document.getElementById('clearLogBtn').addEventListener('click', () => {
    document.getElementById('logEntries').innerHTML =
        '<div class="log-placeholder">Events will appear here as you interact with the player.</div>';
});

document.getElementById('createPlaylistBtn').addEventListener('click', () => {
    const name = prompt('Enter a playlist name:');

    if (name) {
        playlists.push(new Playlist(name));
        renderPlaylists();
    }
});

player.audio.addEventListener('ended', () => {
    player.next();
});

player.setVolume(parseFloat(document.getElementById('volumeSlider').value));

const favourites = new Playlist('My Favourites');
playlists.push(favourites);
favourites.addTrack(player.tracks[0]);
favourites.addTrack(player.tracks[1]);
favourites.addTrack(player.tracks[2]);
renderPlaylists();




// ================================================================
//  HELPER FUNCTIONS — Provided for you. Do not modify.
//  These handle all the DOM rendering so you can focus on OOP.
// ================================================================

/**
 * Renders the track list in the sidebar.
 * Call this inside loadTracks() after populating this.tracks.
 */
function renderTrackList() {
    const list = document.getElementById('trackList');
    const countEl = document.getElementById('trackCount');
    list.innerHTML = '';
    countEl.textContent = player.getTrackCount();

    player.tracks.forEach((track, index) => {
        const item = document.createElement('div');
        item.classList.add('track-item');
        item.setAttribute('data-index', index);
        item.innerHTML = `
            <span class="track-num">${index + 1}</span>
            <div class="track-details">
                <div class="track-name">${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <span class="track-genre">${track.genre}</span>
        `;
        item.addEventListener('click', () => player.play(index));
        list.appendChild(item);
    });
}

/**
 * Updates the main player UI when a track is loaded.
 * Call this inside play() with the current Track object.
 */
function updatePlayerUI(track) {
    document.getElementById('playerTrackName').textContent = track.title;
    document.getElementById('playerArtist').textContent    = track.artist;
    document.getElementById('playerGenre').textContent     = track.genre;
    document.getElementById('nowPlayingName').textContent  = track.title;
    document.getElementById('nowPlayingGenre').textContent = track.genre;
    document.getElementById('playBtn').textContent         = '⏸';
    document.getElementById('playBtn').classList.add('playing');
    document.getElementById('playerArt').classList.add('playing');

    // Highlight active track in sidebar
    document.querySelectorAll('.track-item').forEach((el, i) => {
        el.classList.toggle('active', i === player.currentIndex);
    });
}

/**
 * Renders the playlist list in the sidebar.
 * Call this whenever playlists are created or updated.
 */
const playlists = [];

function renderPlaylists() {
    const container = document.getElementById('playlistList');
    if (playlists.length === 0) {
        container.innerHTML = '<div class="empty-msg">No playlists yet.</div>';
        return;
    }
    container.innerHTML = '';
    playlists.forEach(pl => {
        const div = document.createElement('div');
        div.classList.add('playlist-item');
        div.innerHTML = `
            <div>${pl.name}</div>
            <div class="playlist-count">${pl.getTracks().length} track(s)</div>
        `;
        container.appendChild(div);
    });
}

/**
 * Adds a timestamped entry to the activity log.
 * Call addLog('your message') anywhere in your code.
 */
function addLog(message, type = '') {
    const container = document.getElementById('logEntries');
    const ph = container.querySelector('.log-placeholder');
    if (ph) container.removeChild(ph);

    const entry = document.createElement('div');
    entry.classList.add('log-entry');
    if (type) entry.classList.add(`log-${type}`);

    const now = new Date();
    const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
        .map(n => String(n).padStart(2, '0')).join(':');

    entry.innerHTML = `<span class="log-time">[${time}]</span> ${message}`;
    container.appendChild(entry);

    const all = container.querySelectorAll('.log-entry');
    if (all.length > 12) container.removeChild(all[0]);
    container.scrollTop = container.scrollHeight;
}

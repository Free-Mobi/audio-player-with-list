$(document).ready(function() {
    // Array of song filenames (assuming they are in the "audio" folder)
    const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
    
    // Reference to the currently playing audio and button
    let currentAudio = null;
    let currentButtonId = null;

    // Function to play or pause a song
    function playPauseSong(songFile, btnId) {
        const audioPlayer = new Audio('audio/' + songFile);

        // If the same item is clicked again, toggle play/pause
        if (currentAudio && currentAudio.src === audioPlayer.src) {
            if (currentAudio.paused) {
                currentAudio.play();
                $('#' + currentButtonId).text('Pause');
            } else {
                currentAudio.pause();
                $('#' + currentButtonId).text('Play');
            }
        } else {
            // Stop the current audio if it's playing
            if (currentAudio) {
                currentAudio.pause();
                $('#' + currentButtonId).text('Play');
                currentAudio = null;
                currentButtonId = null;
            }

            // Play the selected song
            audioPlayer.play();
            $('#' + btnId).text('Pause');

            // Set the new audio as the current audio
            currentAudio = audioPlayer;
            currentButtonId = btnId;

            // When the audio finishes playing, reset the button text
            audioPlayer.addEventListener('ended', function() {
                $('#' + btnId).text('Play');
            });
        }
    }

    // Event handling for existing play/pause buttons
    $('.play-pause-btn').click(function() {
        const songIndex = $(this).attr('id').split('_')[1] - 1;
        playPauseSong(songs[songIndex], $(this).attr('id'));
    });
});

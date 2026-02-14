// -----------------------------------------
// Function to move the "No" button randomly
// -----------------------------------------
function moveNoButtonRandom() {

    // Get the No button
    const noBtn = document.getElementById('no-button');
    if (!noBtn) return;

    // Make button move freely across screen
    noBtn.style.position = 'fixed';

    const padding = 20;

    // Get button size
    const rect = noBtn.getBoundingClientRect();

    // Calculate max allowed positions
    const maxX = window.innerWidth - rect.width - padding;
    const maxY = window.innerHeight - rect.height - padding;

    // Generate random positions
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply new position
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}


// -----------------------------------------
// Function to handle button click events
// -----------------------------------------
function selectOption(option) {

    // If Yes button is clicked
    if (option === 'yes') {

        const sound = document.getElementById('yippiee-sound');
        if (sound) {
            sound.currentTime = 0;   // restart if clicked again
            sound.volume = 0.5;
            sound.play().catch(err => {
                console.log("Audio failed:", err);
            });
        }
        
        flashRainbowColors(function () {

            const fgif = document.getElementById('front-gif');
            if (fgif) {
                fgif.style.display = 'none';
            }
            
            // Change question text
            document.getElementById('question').innerText =
                "YAYYY! I LOVE YOUUUUUUU ❤️\nAnd I love you more hehehehe";

            // Hide the buttons
            document.getElementById('options').style.display = 'none';

            // Create GIF element
            const gif = document.createElement('img');
            gif.src = 'yippee.gif'; 
            gif.alt = 'Yippee!';
            gif.style.marginTop = '20px';
            gif.style.width = '300px';

            // Add GIF to container
            document.getElementById('container').appendChild(gif);
        });
}


    // If No button is clicked
    else if (option === 'no') {

        const noBtn = document.getElementById('no-button');
        const yesButton = document.getElementById('yes-button');

        // Move No button immediately
        moveNoButtonRandom();

        // Change No button text
        noBtn.innerText = 'Naw, wrong!';

        // Increase font size of Yes button
        var currentFontSize = window.getComputedStyle(yesButton)
            .getPropertyValue('font-size');

        var newSize = parseFloat(currentFontSize) * 1.5;
        yesButton.style.fontSize = newSize + 'px';
    }

    // If invalid option somehow triggered
    else {
        alert('Invalid option!');
    }
}


// -----------------------------------------
// Function to flash rainbow colors
// -----------------------------------------
function flashRainbowColors(callback) {

    var colors = [
        '#ff0000',
        '#ff7f00',
        '#ffff00',
        '#00ff00',
        '#0000ff',
        '#4b0082',
        '#9400d3'
    ];

    var i = 0;

    // Change background every 200ms
    var interval = setInterval(function () {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200);

    // Stop flashing after 2 seconds
    setTimeout(function () {
        clearInterval(interval);

        // Reset background
        document.body.style.backgroundColor = '#ffe6ec';

        // Run callback if provided
        if (callback) callback();

    }, 2000);
}


// -----------------------------------------
// Add hover escape behavior after page loads
// -----------------------------------------
window.onload = function () {

    const noBtn = document.getElementById('no-button');

    // Make No button run away on hover
    if (noBtn) {
        noBtn.addEventListener('mouseover', moveNoButtonRandom);
    }
};


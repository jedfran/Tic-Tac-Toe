// Variable keeps track of whose turn it is
let activePlayer = 'X';
// Array stores an array of moves. We use this to determine win conditions
let selectedSquares =[];

// Function for placing an X or O in a square
function placeXOrO(squareNumber) {
    // Condition ensures a square hasn't been selected already
    // The .some() method is used to check each element of the selecSquare array
    // to see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // Variable retrives the HTML element id that was clicked on
        let select = document.getElementById(squareNumber);
        // Condition chekc who's turn it is.
        if (activePlayer === 'X') {
            // If activePLayer is equal to "X, the x.png is placed in HTML
            select.style.backgroundImage = 'url("images/my_x.png")';
            // Active player may only be 'X' or 'O' so, if not 'X' it must be 'O'
        } else {
            // If active player is equal to 'O', the o.png is placed on HTML
            select.style.backgroundImage = 'url("images/my_o.png")';
        }

        // squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        // Function to check for any win conditions.
        checkWinConditions();
        // Condition is for changing the active player
        if (activePlayer === 'X') {
            // If active player is "X" change it to "O"
            activePlayer = 'O';
            // If active player is anything other than "X"
        } else {
            // Change the active player to "X"
            activePlayer ='X';
        }

        // Function plays a sounds whenever X or O is placed
        audio ('./media/place.mp3');
        // Condition checks to see if it is the computers turn
        if (activePlayer === 'O') {
            // Function disables clicking for computer's turn
            disableClick();
            // Function waits 1 second the computer places an image and enables click
            setTimeout(function () {computersTurn();}, 1000);
        }
        // Returning true is need for our computerTurn() function to work
        return true;
    }

    // This function results in a random square being selected by computer'
    function computersTurn() {
        // Boolean is need for our while loop
        let success = false;
        // Variable store random number 0-8
        let pickASqaure;
        // Condition allows our while loop to keep trying if square is already selected
        while (!success) {
            pickASqaure = String (Math.floor(Math.random()*9));
            // If the random number evaluated returns true, the square hasn't been selected
            if (placeXOrO(pickASqaure)) {
                // This line calls the function
                placeXOrO(pickASqaure);
                // Changes boolean to true and ends loop
                success = true;
            };
        }
    }
}

// This function parses the selectedSquares array to search for win conditions
//drawline() function is called to draw a line on the screen if the condition is met.
function checkWinConditions() {
    // All the 'X' Win Conditions
    // X 0, 1, 2 condition
    if (arrayIncludes('0X', '1X', '2X')) {drawWinLine(50,100,558,100)}
    // X 3, 4, 5 condition
    else if (arrayIncludes('3X', '4X', '5X')) {drawWinLine(50, 304, 558, 304)}
    // X 6, 7, 8 condition
    else if (arrayIncludes('6X', '7X', '8X')) {drawWinLine(50, 508, 558, 508)}
    // X 0, 3, 6 condition
    else if (arrayIncludes('0X', '3X', '6X')) {drawWinLine(100, 50, 100, 558)}
    // X 1, 4, 7 condition
    else if (arrayIncludes('1X', '4X', '7X')) {drawWinLine(304, 50, 304, 558)}
    // X 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '8X')) {drawWinLine(508, 50, 508, 558)}
    // X 6, 4, 2 condition
    else if (arrayIncludes('6X', '4X', '2X')) {drawWinLine(100, 508, 510, 90)}
    // X 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) {drawWinLine(100, 100, 520, 510)}

    // All the 'O' Win Condition
    // O 0, 1, 2
    else if (arrayIncludes('0O', '1O', '2O')) {drawWinLine(50, 100, 558, 100)}
    // O 3, 4, 5 condition
    else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine(50, 304, 558, 304)}
    // O 6, 7, 8 condition
    else if (arrayIncludes('6O', '7O', '8O')) {drawWinLine(50, 508, 558, 508)}
    // O 0, 3, 6 condition
    else if (arrayIncludes('0O', '3O', '6O')) {drawWinLine(100, 50, 100, 558)}
    // O 1, 4, 7 condition
    else if (arrayIncludes('1O', '4O', '7O')) {drawWinLine(304, 50, 304, 558)}
    // O 2, 5, 8 condition
    else if (arrayIncludes('2O', '5O', '8O')) {drawWinLine(508, 50, 508, 558)}
    // O 6, 4, 2 condition
    else if (arrayIncludes('6O', '4O', '2O')) {drawWinLine(100, 508, 510, 90)}
    // O 0, 4, 8 condition
    else if (arrayIncludes('0O', '4O', '8O')) {drawWinLine(100, 100, 520, 510)}

    //Condition checks for a tie. If none of the above conditions are met and 
    //9 squares are selected the code executes
    else if (selectedSquares.length >= 9) {
        // This function plays the tie game sound
        audio ('./media/tie.mp3');
        // This function sets a .3 second timer before resetGame is called
        setTimeout(function(){ resetGame(); }, 500);
    }
}

// This function checks if an array includes 3 string. It is used to check for
// each win condition
function arrayIncludes (squareA, squareB, squareC) {
    // These 3 variables will be used to check for 3 in a row
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    // If the 3 variables we pass are all included in our array then
    // true is returned and our else if condition executes the drawLine() function
    if (a === true && b === true && c === true) {return true;}
}

// THis function makes our body element temporarily unclickable
function disableClick() {
    // Makes body element unclickable
    body.style.pointerEvents = 'none';
    // Makes body element clickable after 1 second
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

// Function takes a string parameter of the path you set earlier for
// placement sound (./media/place.mp3)
function audio(audioURL) {
    // we create a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    // Play method plays our audio soundv
    audio.play();
}

// THis function ultilizes HTML cnavas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // This line accesses our HTML canvas element
    const canvas = document.getElementById("win-lines");
    // This line gives us access to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    // This line indicates where the start of lines x axis is
    let x1 = coordX1,
    // This line indicates where the start of lines y axis is
        y1 = coordY1,
        // This line indicates where the end of lines y axis is
        x2 = coordX2,
        // This line indicates where the end of lines y axis is
        y2 = coordY2,
        // This variable stores temporary x axis data we update in our animation loop
        x = x1,
        // This variable stores temporary y axis data we update in our animation loop
        y = y1;

    // This function interacts with the canvas
    function animateLineDrawing() {
        // Variable creates a loop
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        // Method clears content from the last loop iteration
        c.clearRect(0, 0, 608, 608);
        // Method starts new path
        c.beginPath();
        // Method moves us to a starting point in our line
        c.moveTo(x1,y1);
        // Method indicates the end point in our line
        c.lineTo(x,y);
        // Method sets the width of our line
        c.lineWidth = 10;
        // Method sets the color our line
        c.strokeStyle = 'red';
        // Method draws everything we laid out above
        c.stroke();
        // Condition checks if we've reaach the endpoints.
        if(x1 <= x2 && y1 <= y2) {
            // Condition adds 10 to the previous end x endpoint
            if (x < x2) {x +=10;}
            // Condition adds 10 to the previous end y endpoint
            if (y < y2) {y +=10;}
            // Condition is similar to the one above
            // It is necessary for the 6,4,2 win conditions
            if (x >= x2 && y >= y2 ) {cancelAnimationFrame(animationLoop);}
        }
        // Condition is similar to the one above
        // It is necessary for the 6,4,2 win conditions
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) {x += 10;}
            if (y > y2) {y -= 10;}
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop);}
        }
    }

        // This function clears our canvas after our win line is drawn
        function clear() {
            // This line starts our animation loop
            const animationLoop = requestAnimationFrame(clear);
            // This line clears our canvas
            c.clearRect (0, 0, 608, 608);
            // This line stops our animation loop
            cancelAnimationFrame(animationLoop);
        }

        // This line disallows clicking while the win sound is playing
        disableClick ();
        // This line plays the win sound
        audio ('./media/winGame.mp3');
        // This line calls our main animation loop
        animateLineDrawing();
        // This line waits 1 second. Then, clears canvas, resets game, and allows clicking again
        setTimeout(function () {clear(); resetGame(); }, 1000);
}

// This function resets the game in the even of a tie or a win
function resetGame () {
    // For Loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        // variable gets the HTML element i
        let square = document.getElementById(String(i));
        // Removes our elements backgroundImage.
        square.style.backgroundImage = '';
    }
    // This resets our array so it is empty and we can start over
    selectedSquares = [];
}
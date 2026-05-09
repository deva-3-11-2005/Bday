let puzzleTiles = [];
const rows = 2;
const cols = 2;
let emptyPos = { r: 1, c: 1 };


let currentPuzzleImg = '';
const puzzleImages = ['img/puzzle1.jpg', 'img/puzzle2.jpg', 'img/puzzle3.jpg'];


function initPuzzle() {
    const board = document.getElementById('puzzle-board');
    const puzzleGift = document.getElementById('puzzle-gift');

    // Select a random image
    currentPuzzleImg = puzzleImages[Math.floor(Math.random() * puzzleImages.length)];

    board.classList.remove('hidden');
    puzzleGift.classList.add('hidden');

    board.innerHTML = '';
    puzzleTiles = [];
    emptyPos = { r: 1, c: 1 }; // Reset empty position


    // Create initial solved state
    for (let i = 0; i < rows * cols; i++) {
        puzzleTiles.push(i);
    }

    // Shuffle by making random valid moves to ensure solvability
    shufflePuzzle();

    renderBoard();
}


function shufflePuzzle() {
    let moves = 0;
    while (moves < 100) {
        const neighbors = getNeighbors(emptyPos.r, emptyPos.c);
        const move = neighbors[Math.floor(Math.random() * neighbors.length)];
        swapTiles(emptyPos.r, emptyPos.c, move.r, move.c);
        emptyPos = move;
        moves++;
    }
}

function getNeighbors(r, c) {
    const n = [];
    if (r > 0) n.push({ r: r - 1, c: c });
    if (r < rows - 1) n.push({ r: r + 1, c: c });
    if (c > 0) n.push({ r: r, c: c - 1 });
    if (c < cols - 1) n.push({ r: r, c: c + 1 });
    return n;
}

function swapTiles(r1, c1, r2, c2) {
    const idx1 = r1 * cols + c1;
    const idx2 = r2 * cols + c2;
    const temp = puzzleTiles[idx1];
    puzzleTiles[idx1] = puzzleTiles[idx2];
    puzzleTiles[idx2] = temp;
}

function renderBoard() {
    const board = document.getElementById('puzzle-board');
    board.innerHTML = '';

    puzzleTiles.forEach((tileIdx, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;

        const tile = document.createElement('div');
        tile.classList.add('puzzle-tile');

        if (tileIdx === (rows * cols - 1)) {
            tile.classList.add('empty');
        } else {
            const tr = Math.floor(tileIdx / cols);
            const tc = tileIdx % cols;
            tile.style.backgroundImage = `url("${currentPuzzleImg}")`;
            tile.style.backgroundPosition = `-${tc * 200}px -${tr * 200}px`; // 400px / 2 = 200px

            tile.onclick = () => handleTileClick(r, c);

        }

        board.appendChild(tile);
    });
}

function handleTileClick(r, c) {
    if (isNeighbor(r, c, emptyPos.r, emptyPos.c)) {
        swapTiles(r, c, emptyPos.r, emptyPos.c);
        emptyPos = { r, c };
        renderBoard();
        checkWin();
    }
}

function isNeighbor(r1, c1, r2, c2) {
    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
}

function checkWin() {
    const isWin = puzzleTiles.every((tile, i) => tile === i);
    if (isWin) {
        // Enhanced completion: lines disappear and tiles "join"
        const tiles = document.querySelectorAll('.puzzle-tile');
        
        // Remove gaps and borders with a smooth transition
        tiles.forEach(tile => {
            tile.style.transition = 'all 0.8s ease';
            tile.style.border = 'none';
            tile.style.borderRadius = '0';
            tile.style.boxShadow = 'none';
        });
        
        // Remove gap from board
        const board = document.getElementById('puzzle-board');
        board.style.transition = 'gap 0.8s ease';
        board.style.gap = '0';

        setTimeout(() => {
            board.classList.add('hidden');
            
            // Set the solved image in the reveal div
            const solvedImg = document.getElementById('solved-puzzle-img');
            solvedImg.src = currentPuzzleImg;
            
            document.getElementById('puzzle-gift').classList.remove('hidden');
            
            // Success animation
            gsap.from("#puzzle-gift", { scale: 0.5, opacity: 0, duration: 1, ease: "back.out" });
            
            // Start 5 second countdown
            startPuzzleCountdown();
        }, 1200);
    }
}

function autoSolvePuzzle() {
    // Reset tiles to solved state
    puzzleTiles = [];
    for (let i = 0; i < rows * cols; i++) {
        puzzleTiles.push(i);
    }
    emptyPos = { r: rows - 1, c: cols - 1 };
    renderBoard();
    
    // Brief delay to show solved board before win sequence
    setTimeout(checkWin, 300);
}


function startPuzzleCountdown() {
    let timeLeft = 5;
    const timerDisplay = document.getElementById('puzzle-timer');
    const progressBar = document.getElementById('puzzle-progress');

    // Reset progress bar
    if (progressBar) progressBar.style.width = '0%';

    const countdown = setInterval(() => {
        timeLeft--;
        if (timerDisplay) timerDisplay.innerText = timeLeft;

        // Update progress bar
        if (progressBar) {
            const progress = ((5 - timeLeft) / 5) * 100;
            progressBar.style.width = `${progress}%`;
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            // Navigate to final surprise
            if (typeof navigateToSection === 'function') {
                navigateToSection('final-surprise', 'Preparing the final surprise...');
            }
        }
    }, 1000);
}



function initPuzzleAnimations() {
    gsap.from(".puzzle-board", { scale: 0.8, opacity: 0, duration: 1 });
}

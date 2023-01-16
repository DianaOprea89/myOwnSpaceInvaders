const grid = document.querySelector('.grid');
let currentShooterIndex = 202;
let leftMargin = 195;
let rightMargin = 209;
let goingRight = true;
let width = 15;
let direction = 1;
let invadersId;
const resultsDisplay = document.querySelector('.results');
for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    square.textContent = i;
    grid.appendChild(square)
}

const aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39];


let aliensRemoved = 0;
const squares = Array.from(document.querySelectorAll('.grid div'));

function drawAliens() {
    for (let i = 0; i < aliens.length; i++) {
        squares[aliens[i]].classList.add('aliens');
    }
}

function remove() {
    // it takes out of the DOM all the aliens, and not out the array
    for (let i = 0; i < aliens.length; i++) {
        squares[aliens[i]].classList.remove('aliens');
    }
}


//main game loop
function moveInvaders() {
    let firstArray = aliens.slice(0, 10);

    let secondArray = aliens.slice(10, 20);

    let thirdArray = aliens.slice(20, 30);


    const leftEdge = firstArray[0] % width === 0 || secondArray[0] % width === 0 || thirdArray[0] % width === 0
    const rightEdge = firstArray[firstArray.length - 1] % width === width - 1 || secondArray[secondArray.length - 1] % width === width - 1 || thirdArray[thirdArray.length - 1] % width === width - 1//sunt true in momentul coliziuni
    remove()


    // 1st step that determines the collision
    if (rightEdge && goingRight) {
        // console.log(aliens);
        for (let i = 0; i < aliens.length; i++) {

            aliens[i] += width + 1
            direction = -1;
            goingRight = false;
        }
        // console.log(aliens);
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < aliens.length; i++) {
            aliens[i] += width - 1;
            direction = 1;
            goingRight = true;
        }
    }

    // 2 nd stept that moves the alines, according to the direction , wich at the begining comes from the global variable amd than in changes acording to the collision ( can be 1 or -1);
    for (let i = 0; i < aliens.length; i++) {

        aliens[i] += direction;

        if (aliens[i] > currentShooterIndex) {
            squares[currentShooterIndex].classList.add('boom');
            resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersId);

        }

    }

    drawAliens();
    if (aliensRemoved === 30) {
        resultsDisplay.innerHTML = 'YOU WIN'
        clearInterval(invadersId);
    }
}


invadersId = setInterval(moveInvaders, 300);
squares[currentShooterIndex].classList.add('shooter');

const shooter = document.getElementsByClassName('shooter');


document.addEventListener("keydown", function (event) {

    squares[currentShooterIndex].classList.remove('shooter');
    switch (event.key) {
        case "ArrowLeft":

            // console.log(currentShooterIndex);//202
            //  console.log(leftMargin)//195

            if (currentShooterIndex > leftMargin) {
                currentShooterIndex -= 1
            }
            break;
        case  "ArrowRight":
            if (currentShooterIndex < rightMargin) {
                currentShooterIndex += 1;
            }
            break;
    }
    squares[currentShooterIndex].classList.add('shooter');

});


document.addEventListener("keyup", function (shoot) {

    if (shoot.key === "ArrowUp") {
        let laserPosition = currentShooterIndex;

        function moveLaser() {
            squares[laserPosition].classList.remove("laser");
            laserPosition -= 15;
            if (laserPosition < 0) {
                clearInterval(laserId); //stop interval
                return;
            }

            for (let i = 0; i <= aliens.length; i++) {

                if (aliens[i] === laserPosition) {
                    aliensRemoved++;
                    //        console.log(aliens[i]);
                    //       console.log(laserPosition);
                    remove();
                    aliens.splice(i, 1);
                    drawAliens()

                    //             console.log(aliens);
                    //           console.log(aliensRemoved);
                    resultsDisplay.innerText = aliensRemoved;

                }
            }
            squares[laserPosition].classList.add("laser");
        }
        let laserId = setInterval(moveLaser, 100);

    }

});





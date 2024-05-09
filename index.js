let direction = { x: 0, y: 0 }; /*initial state of snake (not moving) */

let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }   /* Initial position of snake */
]
let food = { x: 5, y: 11 } /*initial position of food */
let score = 0;
let score_element = document.getElementById('score_element');
let final_score = document.getElementById('final_score');
let restart_button = document.getElementById('restart');
let food_sound = new Audio('food.mp3');
let game_over_sound = new Audio('game_over.mp3');

document.getElementById('board').style.display = 'none';
const restart = document.getElementById('restart');

// Add event listener to the button
restart.addEventListener('click', function() {
    // Reload the page
    location.reload();
});
function main(currentTime) {

    let speed = document.getElementById('speed').value;
    document.getElementById('speed').addEventListener('change', function () {
        // Hide the select element when an option is selected
        this.style.display = 'none';

        document.getElementById('start_inst').style.display = 'block';
        document.getElementById('board').style.display = 'grid';

    });

    console.log(speed);

    window.requestAnimationFrame(main);

    //condition to control FPS(or the render will be too fast to play the game)
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function collide(sarr) {
    //if it collides in border
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    if (sarr[0].x < 0 || sarr[0].x > 18 || sarr[0].y < 0 || sarr[0].y > 18) {
        return true;
    }

    return false;
}
function highscore(){
    const highscore = localStorage.getItem('highscore_item');
        
        if(highscore >= score){
            highscore = score;
            console.log(highscore);
            localStorage.setItem('highscore_item',highscore);
        }
}
function gameEngine() {

    //if snake collides 
    if (collide(snakeArr)) {
        game_over_sound.play();
        direction = { x: 0, y: 0 };
        snakeArr = [
            { x: 13, y: 15 }   /* Initial position of snake */
        ]
        restart_button.style.display = 'block';
        start_inst.style.display = 'none';
        document.getElementById('start_inst').style.display = 'none';
        document.getElementById('board').style.display = 'none';
        score_element.style.display = 'none';
        final_score.innerHTML = "Your total score is " + score;
        alert("Game over");
        
    }

    /////////////////* IF SNAKE EATS FOOD *///////////////

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {

        // unshift() method adds element to the beginning of the arr array.
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y })  //adds element to head

        //update food
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score += 1;

        // highscore();
        food_sound.play();

        score_element.innerHTML =  score;
        console.log(score);


    }

    ////////////* MOVING THE SNAKE *///////////////////////// 

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }  //moving the array element position to higher position 
    }

    //moving head to direction of keydown(click switch case)
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    //Part 3: Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake_head');
        board.appendChild(snakeElement);
    })

    //Part 4: Display the food
    foodElemnt = document.createElement('div');
    foodElemnt.style.gridRowStart = food.y;
    foodElemnt.style.gridColumnStart = food.x;
    foodElemnt.classList.add('snake_food')
    board.appendChild(foodElemnt);

}


///////////* Game Logic *///////////////////
const high=localStorage.getItem('highscore_item');
if(high === null){
localStorage.setItem('highscore_item','0');
}

window.requestAnimationFrame(main); //used for gameloop, to repaint (applying animations continuously )
window.addEventListener('keydown', e => { // keydown event triggers whenever any key on the keyboard is pressed down
    //Start the game
    switch (e.key) {
        default:
            break;
        case "ArrowUp":
            document.getElementById('start_inst').style.display = 'none';
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            document.getElementById('start_inst').style.display = 'none';
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowRight":
            document.getElementById('start_inst').style.display = 'none';
            direction.x = 1;
            direction.y = 0;
            break;
        case "ArrowLeft":
            document.getElementById('start_inst').style.display = 'none';
            direction.x = -1;
            direction.y = 0;
            break;
        

    }
})
let direction = {x: 0, y: 0}; /*initial state of snake (not moving) */
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
let food = {x:5, y:11}

function main(currentTime){
    window.requestAnimationFrame(main);
    
    //condition to control FPS(or the render will be too fast to play the game)
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function gameEngine(){
    // Part 1: Updating the snake array 



    // Part 2: Updating the snake food 
    
   




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

window.requestAnimationFrame(main); //used for gameloop, to repaint (applying animations continuously )
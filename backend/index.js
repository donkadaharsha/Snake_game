let direction = {x: 0, y: 0}; /*initial state of snake (not moving) */
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}   /* Initial position of snake */
]
let food = {x:5, y:11} /*initial position of food */
let score = 0;
function main(currentTime){
    window.requestAnimationFrame(main);
    
    //condition to control FPS(or the render will be too fast to play the game)
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}
function collide(sarr){
    return false;
}
function gameEngine(){

    //if snake collides 
    if(collide(snakeArr)){
        direction = {x:0, y:0};
        snakeArr = [
            {x: 13, y: 15}   /* Initial position of snake */
        ]
        score = 0;
        alert("Game over");
    }

    /////////////////* IF SNAKE EATS FOOD *///////////////

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        
        /* unshift() method adds element to the beginning of the arr array. Here it adds one element on 
        top of the snake head */
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y}) 
        let a = 2;
        let b = 16;

        //update food
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())}

    }
    ////////////* MOVING THE SNAKE *///////////////////////// 

    for(let i = snakeArr.length - 2 ; i>= 0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y ;   

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

window.requestAnimationFrame(main); //used for gameloop, to repaint (applying animations continuously )
window.addEventListener('keydown',e => { // keydown event triggers whenever any key on the keyboard is pressed down
    direction = { x: 0, y: 1} //Start the game
    switch(e.key){
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;
        default:
            break;
              
    }
})
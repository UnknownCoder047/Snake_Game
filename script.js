
// game variables
let inputDir={x:0,y:0};
let foodSound=new Audio('sound/food.mp3');
let gameOverSound=new Audio('sound/gameover.wav');
let moveSound=new Audio('sound/move.wav');
let musicSound= new Audio('sound/music.mp3');
let speed=5;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
];
let score=0;
food = {x: 6, y: 7};

board=document.querySelector('.board');
scoreBox=document.querySelector('.score');
musicSound.loop=true;
//game function

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime- lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(sarr){
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y){
            return true;
        }
    }
    if(snakeArr[0].x >= 18 || snakeArr[0].x <=0 || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
        return true;
    }
    return false;
}

function gameEngine(){
    //upadate snake array and food

    if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        alert("Game Over. Press any key to play again!");
        inputDir =  {x: 0, y: 0};
        snakeArr = [{x: 13, y: 15}];
        gameOverSound.pause();
        musicSound.play();
        score = 0; 
    }

    // if food eaten increse score and regenrate food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

     // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display the snake 
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

// game logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {

    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

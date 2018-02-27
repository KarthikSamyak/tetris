var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var grids = [];
var tetriminos = [];
var colorArray = ["red","green","blue","yellow"];
var gameOver = false;

var tBlock = new Block(randomXY(40,600),0, random(0,4),colorArray[random(0,4)]);
tetriminos.push(tBlock);

/*------------------- functions for creating tetrimino using 2D array ------------------*/

function array2D(id) {
    var tetrimino = [];
    if(id == 1) { // square
        let x = randomXY(40,560);
        tetrimino = [[x,0],[x + 40,0],[x, 40],[x + 40, 40]];
        return tetrimino;
    } else if(id == 2) { // horizontal bar
        let x = randomXY(40,440);
        tetrimino = [[x,0],[x + 40,0],[x, 40],[x + 40, 40]];
        return tetrimino;
    } else if(id == 3) { // vertical bar
        let x = randomXY(40,440);
        tetrimino = [[x,0],[x,40],[x, 80],[x, 120]];
        return tetrimino;
    }
}

/*------------------------ Keyboard events ------------------------------------------*/

document.onkeydown = function(e) {
    if (e.keyCode == '38') { // up arrow
        
    }
    else if (e.keyCode == '40') { // down arrow
        if((tBlock.y < 560) && checkGrid(tBlock.x,tBlock.y + 40)) {
            tBlock.clear();
            tBlock.y = tBlock.y + 40;
            tBlock.draw();
        }
    }
    else if (e.keyCode == '37') { // left arrow
        if((tBlock.x > 0) && checkGrid(tBlock.x - 40,tBlock.y)) {
            tBlock.clear();
            tBlock.x = tBlock.x - 40;
            tBlock.draw();
        }
    }
    else if (e.keyCode == '39') { // right arrow
        if((tBlock.x < 560) && checkGrid(tBlock.x + 40,tBlock.y)){
            tBlock.clear();
            tBlock.x = tBlock.x + 40;
            tBlock.draw();
        }
    }
}

/*---------------------------------- Block Constructor ---------------------------------*/
function Block(x, y, id, color) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.color = color;
    this.fixed = false;
}

Block.prototype.clear = function() {
    ctx.clearRect(this.x,this.y,40,40);
}

Block.prototype.draw = function() {  
    ctx.fillStyle=this.color;
    ctx.fillRect(this.x,this.y,40,40);   
}

Block.prototype.update = function() {
    if(checkGrid(this.x,this.y + 40) && this.y + 40 < height) {
        this.y = this.y + 40;
    }
    else if(this.fixed == false) {
        if(this.y == 40) {
            gameOver = true;
        }
        this.y = this.y;
        updateGrid(this.x,this.y);
        console.log(this.x, this.y);
        createNewTetrimino();
        this.fixed = true;
    } else {
        this.y = this.y;
    }

}


/*---------------------------- Initialization function ------------------------*/
function init() {
    Grids();
    loop();
}

/*-------------------- function to create new tetrimino when predecessor occupies a grid-----------*/
function createNewTetrimino() {
    tBlock = new Block(randomXY(40,600),0, random(0,4),colorArray[random(0,4)]);
    tetriminos.push(tBlock);
}

/*------------------------ Function to create random number in multiples of 40----------------------*/
function randomXY(min, max) {
    var rem;
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    if(num > 40) {
        rem = num % 40;
        num = num - rem;
        return num;
    } else {
        rem = 40 % num;
        num = num + rem;
        return num;
    }
}

/*----------------------------- Function for generating random number ----------------------------*/

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}


/*--------------------- Forming and defining grids --------------------------*/
function Grids() {
    var grid;
    for(let i=0; i<height; i+=40) {
        for(let j=0; j<width; j+=40) {
            grid = {
                x: j,
                y: i,
                free: true
            }
            grids.push(grid);
        }
    }
}

/*-------------------- Checking each grid weather it is empty or not ----------------------*/ 
function checkGrid(x,y) {
    for(let i=0; i<grids.length; i++) {
        if(grids[i].x == x && grids[i].y == y) {
            if(grids[i].free == true) {
                return true;
            }else {
                return false;
            }
        }
    }
}

/*--------------------- update grid state --------------------------------*/
function updateGrid(x,y) {
    for(let i=0; i<grids.length; i++) {
        if(grids[i].x == x && grids[i].y == y) {
            grids[i].free = false;
        }
    }
}

function loop() {  
    ctx.clearRect(0,0,600,600);   
    for(let i=0; i<tetriminos.length; i++) {      
        tetriminos[i].update();
        tetriminos[i].draw();   
    }
    setTimeout(function () {
        if(!gameOver){
            requestAnimationFrame(loop);
        }else {
            ctx.fillStyle="red";
            ctx.fillRect(0,0,600,600);
            document.onkeydown = function() {
                return true;
            }
        }         
    }, 500);   
}

init();


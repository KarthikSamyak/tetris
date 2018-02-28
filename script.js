var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var grids = [];
var tetriminos = [];
var colorArray = ["red","green","blue","yellow"];
var gameOver = false;

var tBlock = new Block(array2D(random(1,3)),random(0,4),colorArray[random(0,4)]);
tetriminos.push(tBlock);
console.log(tBlock);

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
function Block(tetrimino, id, color) {
    this.tetrimino = tetrimino;
    this.id = id;
    this.color = color;
    this.fixed = false;
}

Block.prototype.clear = function() {
    ctx.clearRect(this.tetrimino[0][0],this.tetrimino[0][1],40,40);
    ctx.clearRect(this.tetrimino[1][0],this.tetrimino[1][1],40,40);
    ctx.clearRect(this.tetrimino[2][0],this.tetrimino[2][1],40,40);
    ctx.clearRect(this.tetrimino[3][0],this.tetrimino[3][1],40,40);
}

Block.prototype.draw = function() {  
    ctx.fillStyle=this.color;
    ctx.fillRect(this.tetrimino[0][0],this.tetrimino[0][1],40,40);
    ctx.fillRect(this.tetrimino[1][0],this.tetrimino[1][1],40,40);
    ctx.fillRect(this.tetrimino[2][0],this.tetrimino[2][1],40,40);
    ctx.fillRect(this.tetrimino[3][0],this.tetrimino[3][1],40,40);   
}

Block.prototype.update = function() {
    var that = this;
    console.log("check function:", check());
    console.log("checkHeight function:", checkHeight());
    if(check() && checkHeight()) {
        for(let i=0; i<this.tetrimino.length; i++) {
            this.tetrimino[i][1] = this.tetrimino[i][1] + 40;
        }
    }
    else if(this.fixed == false) {
        if(checkTop()) {
            gameOver = true;
        }
        for(let i=0; i<this.tetrimino.length; i++) {
            this.tetrimino[i][1] = this.tetrimino[i][1];
        }
        for(let i=0; i<this.tetrimino.length; i++) {
            updateGrid(this.tetrimino[i][0],this.tetrimino[i][1]);
        }
        createNewTetrimino();
        this.fixed = true;
    } else {
        for(let i=0; i<this.tetrimino.length; i++) {
            this.tetrimino[i][1] = this.tetrimino[i][1];
        }
    }

   function check() {
        for(let i=0; i<that.tetrimino.length; i++) {
            var x = that.tetrimino[i][0];
            var y = that.tetrimino[i][1];
            y = y + 40;
            if(checkGrid(x,y)) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    }

    function checkTop() {
        for(let i=0; i<that.tetrimino.length; i++) {           
            if(that.tetrimino[i][1] == 40) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    }

    function checkHeight() {
        for(let i=0; i<that.tetrimino.length; i++) {
            var x = that.tetrimino[i][0];
            var y = that.tetrimino[i][1];
            y = y + 40;
            if(y < height) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    }

}


/*---------------------------- Initialization function ------------------------*/
function init() {
    Grids();
    loop();
}

/*-------------------- function to create new tetrimino when predecessor occupies a grid-----------*/
function createNewTetrimino() {
    tBlock = new Block(array2D(random(1,3)), random(0,4),colorArray[random(0,4)]);
    tetriminos.push(tBlock);
    console.log(tBlock);
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
    debugger; 
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


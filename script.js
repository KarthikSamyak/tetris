var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var grids = [];
var tetriminos = [];
var colorArray = ["red","green","blue","yellow"];
var gameOver = false;

var randomNum = random(1,5);
var tBlock = new Block(array2D(randomNum), randomNum,colorArray[random(0,4)]);
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
        tetrimino = [[x,0],[x + 40,0],[x + 80, 0],[x + 120, 0],[x + 160, 0]];
        return tetrimino;
    } else if(id == 3) { // vertical bar
        let x = randomXY(40,440);
        tetrimino = [[x,0],[x,40],[x, 80],[x, 120],[x,160]];
        return tetrimino;
    } else if(id == 4) { // L shape
        let x = randomXY(40,440);
        tetrimino = [[x,0],[x,40],[x, 80],[x + 40, 80]];
        return tetrimino;
    }
}

/*------------------------ Keyboard events ------------------------------------------*/

document.onkeydown = function(e) {
    if (e.keyCode == '38') { // up arrow
        
    }
    else if (e.keyCode == '40') { // down arrow
        if(checkHeight() && check()) {
            tBlock.clear();
            for(let i=0; i<tBlock.tetrimino.length; i++) {
                tBlock.tetrimino[i][1] = tBlock.tetrimino[i][1] + 40;
            }
            tBlock.draw();
        }
    }
    else if (e.keyCode == '37') { // left arrow
        if(checkWidthLeft() && checkGridLeft()) {
            tBlock.clear();
            for(let i=0; i<tBlock.tetrimino.length; i++) {
                tBlock.tetrimino[i][0] = tBlock.tetrimino[i][0] - 40;
            }
            tBlock.draw();
        }
    }
    else if (e.keyCode == '39') { // right arrow
        if(checkWidthRight() && checkGridRight()){
            tBlock.clear();
            for(let i=0; i<tBlock.tetrimino.length; i++) {
                tBlock.tetrimino[i][0] = tBlock.tetrimino[i][0] + 40;
            }
            tBlock.draw();
        }
    }
    else if(e.keyCode == '32') { // space bar
        if(checkWidthLeft() && checkGridLeft() && checkGridRight() && checkWidthRight() && checkHeight() && check() && checkGridLeftPlus() && checkGridRightPlus() && checkPlus()) {
            if(tBlock.id == 2) { // if horizontal bar
                tBlock.clear();
                var count = 40;
                for(let i=0; i<tBlock.tetrimino.length; i++) {
                    if(0) {
                        
                    }else {
                        tBlock.tetrimino[i][0] = tBlock.tetrimino[i][0] - count;
                        tBlock.tetrimino[i][1] = tBlock.tetrimino[i][1] + count;
                    }
                    count = count + 40;                 
                }
                tBlock.id = 3;
                tBlock.draw();
            }
          else if(tBlock.id == 3) { // if vertical bar
                tBlock.clear();
                var count = 40;
                for(let i=0; i<tBlock.tetrimino.length; i++) {
                    if(0) {
                        
                    }else {
                        tBlock.tetrimino[i][0] = tBlock.tetrimino[i][0] + count;
                        tBlock.tetrimino[i][1] = tBlock.tetrimino[i][1] - count;
                    }
                    count = count + 40;                 
                }
                tBlock.id = 2;
                tBlock.draw();
            }
        }
    }else if(e.keyCode == '9') { // tab key
        checkGridRowColor(40,40,"red");
    }
}

/*---------------------------------- Helper functions for current tBlock update on key functions ------------------------------*/
function check() {
    for(let i=0; i<tBlock.tetrimino.length; i++) {
        var x = tBlock.tetrimino[i][0];
        var y = tBlock.tetrimino[i][1];
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

function checkPlus() {
    for(let i=0; i<tBlock.tetrimino.length; i++) {
        var x = tBlock.tetrimino[i][0];
        var y = tBlock.tetrimino[i][1];
        y = y + 80;
        if(checkGrid(x,y)) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

function checkGridLeft() {
    for(let i=0; i<tBlock.tetrimino.length; i++) {
        var x = tBlock.tetrimino[i][0];
        var y = tBlock.tetrimino[i][1];
        x = x - 40;
        if(checkGrid(x,y)) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

function checkGridLeftPlus() {
    for(let i=0; i<tBlock.tetrimino.length; i++) {
        var x = tBlock.tetrimino[i][0];
        var y = tBlock.tetrimino[i][1];
        x = x - 80;
        if(checkGrid(x,y)) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

function checkGridRight() {
    for(let i=0; i<tBlock.tetrimino.length; i++) {
        var x = tBlock.tetrimino[i][0];
        var y = tBlock.tetrimino[i][1];
        x = x + 40;
        if(checkGrid(x,y)) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

function checkGridRightPlus() {
    for(let i=0; i<tBlock.tetrimino.length; i++) {
        var x = tBlock.tetrimino[i][0];
        var y = tBlock.tetrimino[i][1];
        x = x + 80;
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
    for(let i=0; i<tBlock.tetrimino.length; i++) {           
        if(tBlock.tetrimino[i][1] == 40) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

function checkHeight() {
    for(let i=0; i<tBlock.tetrimino.length; i++) {
        var x = tBlock.tetrimino[i][0];
        var y = tBlock.tetrimino[i][1];
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

function checkWidthLeft() {
    for(let i=0; i<tBlock.tetrimino.length; i++) {
        var x = tBlock.tetrimino[i][0];
        var y = tBlock.tetrimino[i][1];
        if(x > 0) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

function checkWidthRight() {
    for(let i=0; i<tBlock.tetrimino.length; i++) {
        var x = tBlock.tetrimino[i][0];
        var y = tBlock.tetrimino[i][1];
        if(x < 560) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

/*---------------------------------- Block Constructor ---------------------------------*/
function Block(tetrimino, id, color) {
    this.tetrimino = tetrimino;
    this.id = id;
    this.color = color;
    this.fixed = false;
    this.settle = false;
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
            updateGrid(this.tetrimino[i][0],this.tetrimino[i][1], this.color);
            checkGridRowColor(this.tetrimino[i][0],this.tetrimino[i][1], this.color);
        }
        createNewTetrimino();
        this.fixed = true;
    } else {
        if(check() && checkHeight()) {
            for(let i=0; i<this.tetrimino.length; i++) {
                this.tetrimino[i][1] = this.tetrimino[i][1] + 40;
            }
        }
        else{
            for(let i=0; i<this.tetrimino.length; i++) {
                this.tetrimino[i][1] = this.tetrimino[i][1];
            }
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
                return true;
            }
            else {
               continue;
            }
        }
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
    var randomNum = random(1,5);
    tBlock = new Block(array2D(randomNum), randomNum,colorArray[random(0,4)]);
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
                free: true,
                color: "none"
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
function updateGrid(x,y,color) {
    for(let i=0; i<grids.length; i++) {
        if(grids[i].x == x && grids[i].y == y) {
            grids[i].free = false;
            grids[i].color = color;
        }
    }
}

/*----------------------- Check for the color of single row of grids ----------------------*/
function checkGridRowColor(x,y,color) {
    let count = 0;
    for(let i=0; i<grids.length; i++) {
        if(grids[i].y == y) {
            if(grids[i].color == color) {
                count = count + 1;
            }
        }
    }
    if(count == 15) {
        for(let i=0; i<grids.length; i++) {
            console.log(grids[i]);
            if(grids[i].y == y) {
                alert("Grids freed");
                grids[i].free = true;
            }
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
            ctx.fillStyle="#a5faff";
            ctx.fillRect(0,0,600,600);
            ctx.font="50px Georgia";
            var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
            gradient.addColorStop("0","magenta");
            gradient.addColorStop("0.5","blue");
            gradient.addColorStop("1.0","red");
            // Fill with gradient
            ctx.fillStyle=gradient;
            ctx.fillText("Game over!!",100,250);
            document.onkeydown = function() {
                return true;
            }
        }         
    }, 600);   
}

init();


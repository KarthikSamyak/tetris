var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var grids = [];
var tetriminos = [];

var tBlock = new Block(random(40,560),0, random(0,4),"red");
tetriminos.push(tBlock);

function Block(x, y, id, color) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.color = color;
    this.fixed = false;
}

Block.prototype.draw = function() {
    ctx.fillRect(this.x,this.y,40,40);   
}

Block.prototype.update = function() {
    if(checkGrid(this.x,this.y + 40) && this.y + 40 < height) {
        this.y = this.y + 40;
    }
    else if(this.fixed == false) {
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
    tBlock = new Block(random(40,560),0, random(0,4),"red");
    tetriminos.push(tBlock);
}

/*------------------------ Function to create random number ----------------------*/
function random(min, max) {
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
        tetriminos[i].draw();
        tetriminos[i].update();
    }

    requestAnimationFrame(loop); 
}

init();


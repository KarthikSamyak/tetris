var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var grids = [];

function Block(x, y, id, color) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.color = color;
}

Block.prototype.draw = function() {
    ctx.fillRect(this.x,this.y,40,40);   
}

Block.prototype.update = function() {
    if(checkGrid(this.x,this.y + 40)) {
        this.y = this.y + 40;
    }
    else {
        this.y = this.y;
        updateGrid(this.x,this.y);
    }

}

/*------------------------ Function to create random number ----------------------*/
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
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
            grids[i].free == false;
        }
    }
}

var testBlock = new Block(40, 0, 4, 'blue');

testBlock.draw();


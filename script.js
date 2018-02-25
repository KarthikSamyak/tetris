var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var grids = [];

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

function checkGrid() {

}

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

}

var testBlock = new Block(40, 0, 4, 'blue');

testBlock.draw();


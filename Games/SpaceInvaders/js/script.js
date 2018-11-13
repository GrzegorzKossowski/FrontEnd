
// moving
var UP=38;
var DOWN=40;
var LEFT=37;
var RIGHT=39;
var FIRE=32;
var SPEED = 5;
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;
var fireGun=false;

var canvas = document.getElementById("canvas");
var surface = canvas.getContext("2d");
var image = new Image();

image.addEventListener("load", loadHandler, false);
image.src="img/spaceShooter.png";

//fonts
surface.font = "normal bold 24px Helvetica";
surface.fillStyle = "#0F0";
surface.textBaseline = "top";

//var interval = window.setInterval(timer(5), 1000);
// window.addEventListener("keydown", keydownHandler, false);

//uzycie zegara
licznik.period = 10;
licznik.start();


//functions

function loadHandler() {    
    update();
}

function update(){
    window.requestAnimationFrame(update, canvas);
    moveObjects("playerBullet", sprites);
    movePlayerShip();    
    render();
    licznik.draw();
}


//func. to render sprites (ships, bullets)
function render() {    
    surface.clearRect(0, 0, canvas.width, canvas.height);
    
    //drawBackground(); //draw background

    if(sprites.length !== 0)
    {
        for(var i = 0; i < sprites.length; i++)
        {
            var sprite = sprites[i];            
            surface.drawImage
            (
                image,
                sprite.sourceX, sprite.sourceY,                
                sprite.sourceWidth, sprite.sourceHeight,
                Math.floor(sprite.x), Math.floor(sprite.y),
                sprite.width, sprite.height

                );
        }
    }
}





// starter
// (function() {
// })();


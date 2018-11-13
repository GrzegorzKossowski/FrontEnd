window.addEventListener("keydown", function(event) {
    switch(event.keyCode){
        case UP:
            moveUp = true;
            break;
        case DOWN:
            moveDown = true;
            break;
        case LEFT:
            moveLeft = true;
            break;
        case RIGHT:
            moveRight = true;
            break;
        case FIRE:
            fireGun = true;
            break;
        default:
    }
}, false);

window.addEventListener("keyup", function(event) {
    switch(event.keyCode){
        case UP:
            moveUp = false;
            break;
        case DOWN:
            moveDown = false;
            break;
        case LEFT:
            moveLeft = false;
            break;
        case RIGHT:
            moveRight = false;
            break;
        case FIRE:
            fireGun = false;
            break;
        default: 
    }
}, false);

// func. to move playership

function movePlayerShip() {
    
    if (moveLeft && !moveRight) {
        playerShip.vx = -SPEED;
    }     
    if (moveRight && !moveLeft) {
        playerShip.vx = SPEED;
    }
    if(moveUp && !moveDown) {
        playerShip.vy = -SPEED;
    };
    if (moveDown && !moveUp) {
        playerShip.vy = SPEED;
    }
    
    if(!moveUp && !moveDown)    {
        playerShip.vy = 0;
    }
    if(!moveLeft && !moveRight)    {
        playerShip.vx = 0;
    }
    //boundaries
    playerShip.x = Math.max(0, Math.min(playerShip.x+playerShip.vx, canvas.width - playerShip.width));
    playerShip.y = Math.max(canvas.height/2, Math.min(playerShip.y+playerShip.vy, canvas.height - playerShip.height));    
    if (fireGun) {
        var playerBullet = Object.create(spriteObject);
        playerBullet.name = "playerBullet"
        playerBullet.sourceX = 100;
        playerBullet.sourceY = 200;
        playerBullet.sourceWidth = 3;
        playerBullet.sourceHeight = 9;
        playerBullet.width = 3;
        playerBullet.height = 9;
        playerBullet.x = playerShip.x + Math.round(playerShip.width/2);
        playerBullet.y = playerShip.y - Math.round(playerBullet.height);
        //playerBullet.vx = 0;
        playerBullet.vy = -10;
        sprites.push(playerBullet);
        fireGun=false;
    }
};


function moveObjects(objectName, array) {
    for (var i=0; i<array.length; i++) {
        if (array[i].name == objectName) {
            console.log(array[i].y);
            array[i].move(-10);
            if (array[i].y<0 || array[i].y>canvas.height) {
                array.splice(i,1);
                i--;
            }
        }
    }
}

// func. to draw background only

function drawBackground() {
    if(backgroundSprites[2]!==0)    {
        var sprite = backgroundSprites[2];            
        for (var row=0; row<4; row++)
            for (var col=0; col<2; col++) {                
                surface.drawImage
                (
                    image,
                    sprite.sourceX, sprite.sourceY,                
                    sprite.sourceWidth, sprite.sourceHeight,
                    col*sprite.width, row*sprite.height,
                    sprite.width, sprite.height
                );
            }
    }    
    if(backgroundSprites.length!==0)
    {
        for(var i = 0; i < 2; i++)
        {
            var sprite = backgroundSprites[i];            
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


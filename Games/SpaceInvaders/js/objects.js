//arrays

var sprites = [];
var backgroundSprites = [];

//---------------------------------------------
//classes

var spriteObject = {
    name: "",
    image: "",
    sourceX:0,
    sourceY:0,    
    sourceWidth:0,
    sourceHeight:0,
    x:0,
    y:0,
    width:0,
    height:0,    
    vx: 0,
    vy: 0,
    move: function(speed) {
        this.y += speed;
    }
}

var timer = {
    //wywolanie zegara w pliku glownym
    //licznik.period = 10; // ile sekund
    //licznik.start()   //inicjuj
    counter: 0,
    interval: 0,
    period: 5,
    start: function() {
        var self = this;
        self.interval = window.setInterval(function(){self.tick();}, 1000);
    },
    tick: function() {
        var self = this;
        //console.log("thick");
        self.counter++;        
        console.log(self.counter);
        if (self.counter >= self.period) {
            self.stop();
        }
    },
    stop: function() {
        var self = this;
        window.clearInterval(self.interval);
    },
    draw: function() {
        var self = this;
        surface.fillText(self.counter, 10,10);
    }
}

var licznik = Object.create(timer);

//---------------------------------------------
// objects

var playerShip = Object.create(spriteObject); 
playerShip.name = "playerShip"
playerShip.sourceX = 50;
playerShip.sourceY = 200;
playerShip.sourceWidth = 50;
playerShip.sourceHeight = 50;
playerShip.width = 50;
playerShip.height = 50;
playerShip.x = canvas.width/2 - playerShip.width/2;
playerShip.y = 700;
playerShip.vx = 0;
playerShip.vy = 0;

var enemyShip = Object.create(spriteObject);
enemyShip.name = "enemyShip"
enemyShip.sourceX = 0;
enemyShip.sourceY = 200;
enemyShip.sourceWidth = 50;
enemyShip.sourceHeight = 50;
enemyShip.width = 50;
enemyShip.height = 50;
enemyShip.x = canvas.width/2 - playerShip.width/2;
enemyShip.y = 70;
enemyShip.vx = 0;
enemyShip.vy = 0;

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


var enemyBullet = Object.create(spriteObject);
enemyBullet.name = "enemyBullet"
enemyBullet.sourceX = 100;
enemyBullet.sourceY = 200;
enemyBullet.sourceWidth = 3;
enemyBullet.sourceHeight = 9;
enemyBullet.width = 3;
enemyBullet.height = 9;
enemyBullet.x = 10;
enemyBullet.y = 10;
//playerBullet.vx = 0;
enemyBullet.vy = 10;
enemyBullet.speedY=10;



//order of z-inxex
sprites.push(playerShip);
sprites.push(enemyShip);
sprites.push(playerBullet);
sprites.push(enemyBullet);


var backgroundLeft = Object.create(spriteObject);
backgroundLeft.name = "backgroundLeft";
backgroundLeft.sourceX = 200;
backgroundLeft.sourceY = 0;
backgroundLeft.sourceWidth = 250;
backgroundLeft.sourceHeight = 130;
backgroundLeft.width = 250;
backgroundLeft.height = 130;
backgroundLeft.x=0;
backgroundLeft.y=720;
// 0,700,250,130
backgroundSprites.push(backgroundLeft);

var backgroundRight = Object.create(spriteObject);
backgroundRight.name = "backgroundRight";
backgroundRight.sourceX = 200;
backgroundRight.sourceY = 130;
backgroundRight.sourceWidth = 250;
backgroundRight.sourceHeight = 130;
backgroundRight.width = 250;
backgroundRight.height = 130;
backgroundRight.x=250;
backgroundRight.y=720;
// 250,700,250,13
backgroundSprites.push(backgroundRight);

var skyBackground = Object.create(spriteObject);
skyBackground.name = "skyBackground";
skyBackground.sourceX = 0;
skyBackground.sourceY = 0;
skyBackground.sourceWidth = 200;
skyBackground.sourceHeight = 200;
skyBackground.width= canvas.width/2; //200;
skyBackground.height=canvas.width/2;//200;
skyBackground.x=0;
skyBackground.y=0
backgroundSprites.push(skyBackground);



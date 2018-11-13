//arrays

var sprites = [];
//var backgroundSprites = [];

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
playerShip.sourceX = 0;
playerShip.sourceY = 0;
playerShip.sourceWidth = 100;
playerShip.sourceHeight = 50;
playerShip.width = 100;
playerShip.height = 50;
playerShip.x = canvas.width/2 - playerShip.width/2;
playerShip.y = canvas.height-playerShip.height;



//order of z-inxex
sprites.push(playerShip);


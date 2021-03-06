var canvas = document.getElementById("canvas");
var surface = canvas.getContext("2d");
surface.fillStyle = "rgba(255,255,255,1)";

//fonts
surface.font = "normal bold 20px Helvetica";
surface.fillStyle = "#FFF";
surface.textBaseline = "top";

//var image = new Image();
// image.addEventListener("load", loadHandler, false);
// image.src="img/alieninvasion.png";

var rockets = [];
var aliens = [];
var blasts = [];
var blastRange = 20;    //default rocket blast range
var missilesFired = 0;
var aliensKilled = 0;
var alienKilledRatio = 0;
var humansKilled = 0;
var humansKilledAtBlast = Math.round(Math.random()*(500-100)+100);

var mousePos;

var MovableObjectClass = {
    x:0,
    y:0,
    velocity: 0,
    xTarget:0,
    yTarget:0,
    xVect:0,
    yVect:0,
    dVect:0,
    vJedn:0,
    vxSpeed:0,
    vySpeed:0,
    blastRadius: blastRange,
        
    speedVectorCount: function(targetX, targetY) {
        this.xTarget = targetX;//mousePos.x;
        this.yTarget = targetY;//mousePos.y;
        this.countActualPosition();
        this.countDistanceToTarget();
        this.vxSpeed = ((this.xVect*this.velocity)/this.dVect);
        this.vySpeed = ((this.yVect*this.velocity)/this.dVect);
    },
    
    countActualPosition: function() {
        this.xVect = this.xTarget - this.x;
        this.yVect = this.yTarget - this.y;
    },

    countDistanceToTarget: function() {
        this.dVect = Math.sqrt(this.xVect*this.xVect+this.yVect*this.yVect); //dlugosc wektora
    },

    explosionRangeCheck: function (targetX, targetY) {
        var distX = targetX-this.x;
        var distY = targetY-this.y;
        return Math.sqrt(distX*distX+distY*distY); //dlugosc wektora wybuchu
    },

    draw: function (w,h, drawColor) {
        this.x+=this.vxSpeed;
        this.y+=this.vySpeed;
        surface.fillStyle = drawColor; //"rgba(255,255,255,1)";
        surface.fillRect(this.x-w, this.y-h, 2*w,2*h);
    }
}

var BlastObjectClass = {
    x:0,
    y:0,
    blastRadius: blastRange,
    blastColor: "#FF0"
}

window.addEventListener("load", gameStart,false);
canvas.addEventListener("mousedown", mouseDownHandler,false);
canvas.addEventListener("mousemove", function(evt) {
        //var mousePos = getMousePos(canvas, evt);
        mousePos = getMousePos(canvas, evt);
      }, false);

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            // x: evt.clientX - rect.left,
            // y: evt.clientY - rect.top
            x: evt.clientX - (canvas.offsetLeft - window.pageXOffset),
            y: evt.clientY - (canvas.offsetTop - window.pageYOffset)
        };
      }

function mouseDownHandler() {
    rocketFire();
    //console.log(rockets);
    //update();
}

function gameStart() {
    //function starts aliens cycle & game render cycle
    aliensFire();
    update();
}

function update(){
    window.requestAnimationFrame(update, canvas);    
    render();
}

function render() {
    surface.fillStyle = "rgba(0,0,0,1)";
    surface.clearRect(0, 0, canvas.width, canvas.height);
    surface.fillStyle = "rgba(255,255,255,1)";
    surface.fillRect(Math.round(canvas.width/2)-2, canvas.height-5, 4,5);
        
    aliensDraw();
    rocketsDraw();
    blastDraw();
    statsDraw();

}

function statsDraw() {
    //Display the message text above the square
    if (missilesFired!=0) {
        alienKilledRatio = (( (aliensKilled*100) / missilesFired)).toFixed(2); 
    }
    
    surface.fillStyle = "rgba(255,255,255,1)";
    surface.fillText("Humans lost: "+humansKilled, 10, 10);
    surface.fillText("Shots: "+missilesFired, 10, 30);
    surface.fillText("Ratio: "+ alienKilledRatio + "%", 10, 50);
    surface.fillText("Kills: "+aliensKilled, 10, 70);
}

function rocketFire(){
    var rocket = Object.create(MovableObjectClass);
    missilesFired++;
    rocket.x = Math.round(canvas.width/2);
    rocket.y = canvas.height-6;
    rocket.velocity = 2;
    rocket.speedVectorCount(mousePos.x, mousePos.y);
    rockets.push(rocket);    
}

function rocketsDraw() {
    for (var x=0; x<rockets.length; x++) {
        rockets[x].draw(1,1, "rgba(255,255,0,1)");
        rockets[x].countActualPosition();
        rockets[x].countDistanceToTarget();                
        if (rockets[x].dVect<3) {
            blastFire(rockets[x].x, rockets[x].y, "#550", 20);  //rysuj wybuch na pozycji
            //sprawdz miejsce wybuchu na obcych
            for (var i=0; i<aliens.length; i++) {
                //sprawdz odleglosc obiektow
                var blast = rockets[x].explosionRangeCheck(aliens[i].x, aliens[i].y);
                //jesli w zasiegu, wytnij aliena z tablicy
                if (blast<rockets[x].blastRadius) {
                    aliens.splice(i,1);
                    aliensKilled++;
                }
            }
            rockets.splice(x,1); //wytnij rakiete po wybuchu
        }
    }   
}

function blastFire(xBlast,yBlast,blCol,blRad) {
    if (blRad === undefined) blRad = blastRange;
    var blast = Object.create(BlastObjectClass);
    blast.x = xBlast;
    blast.y = yBlast;
    blast.blastColor = blCol;
    blast.blastRadius = blRad;
    blasts.push(blast);
    
    window.setTimeout(blastRemove, 100);
}

function blastRemove() {    
    blasts.splice(0,1);
    console.log(blasts);
}

function blastDraw() {    
    for (var j=0; j<blasts.length; j++) {        
        surface.beginPath();
        surface.arc(blasts[j].x,blasts[j].y,blasts[j].blastRadius,0,2*Math.PI, false);
        //surface.fillStyle = '#110';   //wypelnienie
        //surface.fill();        
        surface.lineWidth = 1;
        surface.strokeStyle = blasts[j].blastColor;//'#550';
        surface.stroke();
    }    
}



function aliensFire() {
    window.setTimeout(aliensFire, (Math.random() * (4000 - 1000) + 100));
    var alien = Object.create(MovableObjectClass);
    alien.x = Math.round(Math.random() * canvas.width);
    //alien.velocity = Math.round(Math.random() * (1-0.5)+0.5);
    alien.velocity = 0.3;
    alien.xTarget = Math.round(Math.random() * (canvas.width-100)+100);
    alien.yTarget = canvas.height;
    alien.speedVectorCount(alien.xTarget, alien.yTarget);
    //console.log("aliens vector! " + alien.dVect);
    aliens.push(alien);
}

function aliensDraw() {
    for (var x=0; x<aliens.length; x++) {
        aliens[x].draw(2,2, "rgba(0,255,0,1)");
        aliens[x].countActualPosition();
        aliens[x].countDistanceToTarget();                
        if (aliens[x].dVect<3) {            
            blastFire(aliens[x].x, aliens[x].y, "#F00", 100);  //rysuj wybuch na pozycji
            //humans killed
            humansKilled+=humansKilledAtBlast;

            aliens.splice(x,1);            
        }
    }      
}
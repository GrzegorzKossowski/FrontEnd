var canvas = document.getElementById("canvas");
var surface = canvas.getContext("2d");
surface.fillStyle = "rgba(0,0,0,1)";

var AntClass = {
    x: 0,
    y: 0,
    kierunek: 1,

    turnLeft: function(){
        this.kierunek--;
        if (this.kierunek <1) this.kierunek=4;
        this.move(this.kierunek);
    },

    turnRight: function(){
        this.kierunek++;
        if (this.kierunek >4) this.kierunek=1;
        this.move(this.kierunek);
    },

    move: function(dir){
        switch (dir) {
            case 1:
                ant.y--;
                break;
            case 2:
                ant.x++;
                break;
            case 3:
                ant.y++;
                break;
            case 4:
                ant.x--;
                break;
            default:
        }
    }
}

var ant = Object.create(AntClass);
ant.x = Math.round(canvas.width/2);
ant.y = Math.round(canvas.height/2);
ant.kierunek=1;

window.addEventListener("load", goAnt, false);


function goAnt() {

    var color = surface.getImageData(ant.x, ant.y, 1,1);        
    var red = color.data[0];

        if (red > 100) {

            surface.fillStyle = "rgba(0,0,0,1)";
            surface.fillRect(ant.x, ant.y, 1, 1);
            ant.turnLeft();            
            
        } else {            
        
            surface.fillStyle = "rgba(255,255,255,1)";
            surface.fillRect(ant.x, ant.y, 1, 1);           
            ant.turnRight();
        
        }      

        if (ant.x>2 || ant.x<canvas.width-2 || ant.y>2 || ant.y<canvas.height-2) {
            window.setTimeout(goAnt, 1);        
        }       

}
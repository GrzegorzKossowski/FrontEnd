//CONSTANT
var WATER = 0;
var ISLAND = 1;
var HOME = 2;
var PIRATE = 3;
var SHIP = 4;
var MONSTER = 5;
var SKULL = 6;
var SINK = 7;

var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

//arrays
var TILESIZE = 80;
var map = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0],
    [0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0],
];
var gameObjects = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,4,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
];
var ROWS = map.length;
var COLUMNS = map[0].length;

//Variables
//start ship position
var shipRow = 8;
var shipCol = 4;

var moveShip = true;
var food = 20;
var gold = 10;
var experience = 0;
var days = 0;
var gameScore = 0; 
var gameMessage = "Use the arrow keys to sail.<br/>Your goal is to fight pirates & buy food.<br/> Sale to HQ to end game.<br/>[F5] New game";


//TAGS vel ELEMENTS
var content = document.getElementById("content");
var sea = document.getElementById("sea");
var gui = document.getElementById("gui");
var stats = document.getElementById("stats");
stats.innerHTML = "<img src='images/gold.png'><span>" + gold + "</span>" 
    + "<img src='images/food.png'><span>" + food + "</span>" 
    + "<img src='images/score.png'><span>" + experience + "</span>" 
    + "<img src='images/days.png'><span>" + days + "</span>";
var msg = document.getElementById("msg");
msg.innerHTML = gameMessage;
var panel = document.getElementById("panel");
panel.style.display = "none";
var tradeMsg = document.getElementById("tradeMsg");
var sailToSeaBtn = document.getElementById("sailToSea");
//var endTheGame = document.getElementById("endTheGame");
//endTheGame.style.display = "none";

//EventHandlers
window.addEventListener("keydown", keydownHandler, false);

//FUNCTIONS

function keydownHandler(event) {
    moveShip = false;
    switch(event.keyCode) {
        case UP:            
            if(shipRow > 0) {            
                moveShip = true;
                gameObjects[shipRow][shipCol] = 0;            
                shipRow--;            
                gameObjects[shipRow][shipCol] = SHIP;
            }
            break;
        case DOWN:
            if(shipRow < ROWS - 1) {
                moveShip = true;
                gameObjects[shipRow][shipCol] = 0;
                shipRow++;
                gameObjects[shipRow][shipCol] = SHIP;
            }
            break;
        case LEFT:
            if(shipCol > 0) {
                moveShip = true;
                gameObjects[shipRow][shipCol] = 0;
                shipCol--;
                gameObjects[shipRow][shipCol] = SHIP;
            }
            break;
        case RIGHT:
            if(shipCol < COLUMNS - 1) {
                moveShip = true;
                gameObjects[shipRow][shipCol] = 0;
                shipCol++;
                gameObjects[shipRow][shipCol] = SHIP;
            }
            break;
    };
    if (moveShip) {        
        playGame();     
        renderMap();        
    }    
}


function renderMap() {
    if(sea.hasChildNodes()) {
        for (var row = 0; row < ROWS * COLUMNS; row++) {
            sea.removeChild(sea.firstChild);
        };
    }

    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLUMNS; col++) {
            var cell = document.createElement("div");
            cell.setAttribute("class","cell");
            sea.appendChild(cell);

            cell.style.top = row * TILESIZE + "px";
            cell.style.left = col * TILESIZE + "px";
            
            switch(map[row][col]) {
                case WATER:
                    cell.style.backgroundImage = "url('images/water.png')";
                    break;
                case ISLAND:
                    cell.style.backgroundImage = "url('images/island.png')";
                    break;
                case HOME:
                    cell.style.backgroundImage = "url('images/home.png')";
                    break;                
               default:
            }

            switch (gameObjects[row][col]) {
                case SHIP:
                    cell.style.backgroundImage = "url('images/ship.png')";
                    break;
                case PIRATE:
                    cell.style.backgroundImage = "url('images/pirate.png')";
                    break;
                case MONSTER:
                    cell.style.backgroundImage = "url('images/monster.png')";
                    break;
                case SKULL:
                    cell.style.backgroundImage = "url('images/skull.png')";
                    break;
                case SINK:
                    cell.style.backgroundImage = "url('images/sink.png')";
                    break;
                default:
                    break; 
            }
        }
    }
}


//where is the ship on the map and what TODO
function playGame() {    
    food--;
    //if (food==5) { printMessage("More food you need or you die!<br/>Visit an island."); }
    gameScore = (gold * experience)/2; 
    
    switch(map[shipRow][shipCol]) {
        case WATER:
            days++;
            generateEvents();
            break;
        case ISLAND:
            islandTrade();
            break;
        case HOME:
            gameMessage = "Welcome home, captain, after " + days + " days! Check your stats...<br/>You've got <strong>" + experience + "</strong> <img src='images/score.png'> total points.<br/>THE END";
            endGame();
            break;                
        default:
            break;
    }
    printStatus();
};


function generateEvents() {
    printMessage("Sail ahead, captain!");
    if (food <= 0) {
            console.log("koniec jedzenia");
        gameObjects[shipRow][shipCol]=SKULL;        
        gameMessage = "No more food.<br/>THE END";
        endGame();
        return;
    }
    var chance = Math.floor(Math.random()*100);
    if (chance<5) {
            console.log("rafy");
        gameObjects[shipRow][shipCol] = SINK;
        gameMessage = "BAD luck, captain. Reefs!!!<br/>THE END";
        endGame();
        return;
    };
    if (chance<30) {
            console.log("piraci");
        fightPirates();
        return;
    };
    if (chance<35) {
        console.log("35% - empty");
        return;
    };
    if (chance<50) {
        console.log("skarb");
        var treasure = Math.floor(Math.random()*20)+3;
        gameMessage = "GOOD luck, captain.<br/>"+ treasure +" <img src='images/gold.png'> treasure found!!!";        
        gold+=treasure;
        printMessage(gameMessage);
        
        return;
    };
    if (chance<75) {
        console.log("75%");
        return;
    };
    if (chance<85) {
        console.log("85%");
        return;
    };
    if (chance<95) {
        console.log("95%");
        return;
    };
    console.log("+95%");
}

function fightPirates() {
    var shipStrength = Math.ceil((food+gold)/2)+1;
    var pirateStrength = Math.ceil(Math.random()*shipStrength*2)+1;
    var goldToSteal = Math.round(pirateStrength/2)+1;
    if (pirateStrength>shipStrength) {
        var lostGold = 0;        
        if (gold>0) {
            if (goldToSteal>gold && gold >0) {
                lostGold = gold;
                gold = 0;
            } else {
                lostGold = goldToSteal;
                gold -= goldToSteal;
            }
            experience++;
            printMessage("Pirates!<br/>Carramba, we lost " + lostGold + " <img src='images/gold.png'> gold.");
        } else {
            if (Math.ceil(goldToSteal/2) > food && food > 0) {
                lostGold = food;
                food = 1;
            } else {
                lostGold = Math.ceil(goldToSteal/2);
                food -= lostGold;
            }
            experience++;
            printMessage("Pirates ahead!<br/>Carramba, we lost " + lostGold + " <img src='images/food.png'> food.");
        }
        
        
        //printStatus();
    } else {
        gold += goldToSteal; 
        experience+=2;
        printMessage("Pirates!<br/>We plunder " + goldToSteal + " <img src='images/gold.png'> gold.");
        //printStatus();
    }

};

//Enter Islands
function islandTrade() {
    var islandsFood = experience + gold;
    var foodCost = Math.ceil(Math.random() * islandsFood);
    if (gold > foodCost) {
        food+=islandsFood;
        gold-=foodCost;
        experience+=2;
        tradeMsg.innerHTML = "<span>We buy " + islandsFood + " </span><img src='images/food.png'><span> for " 
        + foodCost + " </span><img src='images/gold.png'><span>, captain!</span>";
    } else {
        experience++;
        tradeMsg.innerHTML = "Prices are high these days!<br/>No enough dinero, captain!<br/>Fight pirates we must<br/>or other days we come.";
    }
    //printStatus();    
    panel.style.display = "";
    window.removeEventListener("keydown", keydownHandler, false);
    sailToSeaBtn.addEventListener("click", returnToMap, false);
}

//Close trade panel
function returnToMap() {
    sailToSeaBtn.removeEventListener("click", returnToMap, false);
    panel.style.display = "none";
    window.addEventListener("keydown", keydownHandler, false);    
}

//Enter HQ, End Game
function endGame(msg) {
    printMessage(gameMessage);
    printStatus();
    //endTheGame.style.display = "";
    window.removeEventListener("keydown", keydownHandler, false);
}

//GUI funcions
function printMessage(gameMessage){    
    msg.innerHTML = gameMessage;    
}

function printStatus(){    
    stats.innerHTML = "<img src='images/gold.png'><span>" + gold + "</span>" 
    + "<img src='images/food.png'><span>" + food + "</span>" 
    + "<img src='images/score.png'><span>" + experience + "</span>" 
    + "<img src='images/days.png'><span>" + days + "</span>";
}


//initialize game
(renderMap)();


// OLD CRAP
//-----------------------
// function to move NPC
// function moveNPCs() {
//     var UP = 1;
//     var DOWN = 2;
//     var LEFT = 3;
//     var RIGHT = 4;
//     var whereCanMove = [];

//     for (var row=0; row<ROWS; row++) {
//         for (var col=0; col<COLUMNS; col++) {
//             if (gameObjects[row][col]==MONSTER || gameObjects[row][col]==PIRATE ) {                
//                 whereCanMove.push(checkNPCmove(row,col));                
//                 console.log(whereCanMove);
//             };
//         };
//     };
//     var next = 0;
//     for (var row=0; row<ROWS; row++) {
//         for (var col=0; col<COLUMNS; col++) {
//             if (gameObjects[row][col]==MONSTER) {                
//                 gameObjects[row][col]=WATER;
//                     //console.log(whereCanMove[next] + " MONSTER");
//                 switch (whereCanMove[next]) {
//                     case UP:
//                         gameObjects[row-1][col]=MONSTER;
//                         break;
//                     case DOWN:
//                         gameObjects[row+1][col]=MONSTER;
//                         break;
//                     case LEFT:
//                         gameObjects[row][col-1]=MONSTER;
//                         break;
//                     case RIGHT:
//                         gameObjects[row][col+1]=MONSTER;
//                         break;
//                     default:
//                         gameObjects[row][col]=MONSTER;
//                         break;
//                 }
//                 next++;
//             };
//             if (gameObjects[row][col]==PIRATE) {                
//                 gameObjects[row][col]=0;
//                     //console.log(whereCanMove[next] + " PIRATE");
//                 switch (whereCanMove[next]) {
//                     case UP:
//                         gameObjects[row-1][col]=PIRATE;
//                         break;
//                     case DOWN:
//                         gameObjects[row+1][col]=PIRATE;
//                         break;
//                     case LEFT:
//                         gameObjects[row][col-1]=PIRATE;
//                         break;
//                     case RIGHT:
//                         gameObjects[row][col+1]=PIRATE;
//                         break;
//                     default:
//                         gameObjects[row][col]=PIRATE;
//                         break;
//                 }
//                 next++;
//             };
//         };
//     };    
// };

//func to check valid movement
// function checkNPCmove(npcRow, npcCol) {
//     var UP = 1;
//     var DOWN = 2;
//     var LEFT = 3;
//     var RIGHT = 4;

//     var validDirections = [];   //array of empty pos    
//     if (npcRow>0) {
//         var above = map[npcRow-1][npcCol];
//         if (above==WATER) {
//             validDirections.push(UP);
//         }
//     }
//     if (npcRow<ROWS-1) {
//         var below = map[npcRow+1][npcCol];
//         if (below== WATER) {
//             validDirections.push(DOWN);
//         }
//     }
//     if (npcCol>0) {
//         var toLeft = map[npcRow][npcCol-1];
//         if (toLeft==WATER) {
//             validDirections.push(LEFT);
//         }
//     }
//     if (npcCol < COLUMNS-1) {
//         var toRight = map[npcRow][npcCol+1]
//         if (toRight==WATER) {
//             validDirections.push(RIGHT);
//         }
//     }    
//     var directionToMove = undefined;
//     if (validDirections.length !==0) {
//         var randomNbr = Math.floor(Math.random() * validDirections.length);
//         directionToMove = validDirections[randomNbr];   //get dir from valid dirs
//     } else {
//         directionToMove = 0;
//     }
//     return directionToMove;
// }
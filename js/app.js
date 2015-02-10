// constants
var CANVAS_WIDTH = 505;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x; 
    this.y = y;
    // generate random speed for enemy 
    this.speed = Math.floor(Math.random() * (5 - 1)) + 1; 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= CANVAS_WIDTH) {
        this.x += (100 * dt) + this.speed; 
    }else {
        this.x = -101; 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed,sprite) {
    this.sprite = 'images/char-boy.png'; 
    this.x = x; 
    this.y = y; 
    this.speed = speed; 
    this.score = 0; 
    
}; 

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
Player.prototype.update = function() {
   var lives = 3; 
   for ( var bug = 0; bug < allEnemies.length; bug++) {
        if(allEnemies[bug].x + 70 > this.x + 1 
         && allEnemies[bug].x < this.x + 1  
        &&  allEnemies[bug].y === this.y ) {
        // reset player back to grass
        player.reset(); 
}
    }
    // when player reachs water
    if ( this.y == -10) {
        // increment points
        this.score += 1; 
        // show points
        $('#health').html('<p>Points:' + ' '+ this.score + '</p>');
        // reset player back to grass
        player.reset(); 
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput = function(key) {
    if(this.x > 0 && key =='left'){
        this.x -= 100;
    }else if ( key == 'up' && this.y > -10) {
        this.y -= 80; 
    } else if ( key == 'right' && this.x < 400) {
        this.x += 100; 
    } else if (key == 'down' && this.y < 390) {
        // when moving down
        this.y += 80; 
    }
};

// reset player on the screen
Player.prototype.reset = function() {
    this.x = 200; 
    this.y = 390; 
}; 




var position = [200, 390];
var player = new Player(position[0],position[1]);

var locale = [-400, 230, -200, 150, -100, 70]; 
var enemy1 = new Enemy(locale[0],locale[1]);
var enemy2 = new Enemy(locale[2],locale[3]);
var enemy3 = new Enemy(locale[4],locale[5]);

var allEnemies = [];    

allEnemies=[enemy1,enemy2,enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

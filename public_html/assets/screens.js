/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



Game.Screen = {};

Game.Screen.startScreen = {
    enter:function(){console.log("Entered start screen.");},    
    exit: function(){console.log("Exited the start screen");},
    render: function(display){
        display.drawText(1,1,"%c{yellow} Javascript Roguelike")
        display.drawText(1,2,"Press [Space] to start!");
    },
    handleInput: function(inputType, inputData){
        
        if(inputType === 'keydown'){
            if(inputData.keyCode=== ROT.VK_SPACE){
                Game.switchScreen(Game.Screen.playScreen);
            }
            
            
        }
        else{
            console.log("Something other than keydown was received!");
        }
        
    }
}

Game.Screen.playScreen = {
    
    _map:null,
    _player:null,
    _centerX:0,
    _centerY:0,
    
    enter:function(){
        
        console.log("Entered the play screen!");
        var map = [];
        var mapHeight = 500;
        var mapWidth = 500;
        
    //GEN MAP    
    //////////////////////////////////////    
    //////////////////////////////////////
        for(var x = 0; x<mapWidth; x++){
            map.push([]);
            for(var y=0; y<mapHeight;y++){
                map[x].push(Game.Tile.nullTile);
            }
        }
        
        var generator = new ROT.Map.Cellular(mapWidth,mapHeight);
        generator.randomize(0.5);
        
        var totalIterations = 3;
        
        for(var i=0;i<totalIterations;i++){
            generator.create();
        }
        
        generator.create(function(x,y,v){
            if( v === 1 ){
                map[x][y] = Game.Tile.floorTile;
            }else{
                map[x][y] = Game.Tile.wallTile;
            }  
        });
    ///////////////////////////////////
    
        this._map = new Game.Map(map);
        this._player = new Game.Entity(Game.PlayerTemplate);
        var position = this._map.getRandomFloorPosition();
        this._player.setX(postion.x);
        this._player.setY(position.y);
        
    },
    exit:function(){
        console.log("Exited the play screen!")
    },
    render:function(display){
        
        var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight();
        
        var topLeftX = Math.max(0,this._player.getX()-(screenWidth/2));
        topLeftX = Math.min(topLeftX,this._map.getWidth() - screenWidth);
        
        var topLeftY = Math.max(0,this._play.getY()-(screenHeight/2));
        topLeftY = Math.min(topLeftY, this._map.getHeight() - screenHeight);
        
        for(var x=topLeftX;x<topLeftX+screenWidth;x++){
            for(var y = topLeftY;y<topLeftY+screenHeight;y++){
                var glyph = this._map.getTile(x,y,).getGlyph();
                display.draw(
                x-topLeftX,
                y-topLeftY,
                glyph.getChar(),
                glyph.getForeground(),
                glyph.getBackground());
            }
        }
        
        display.draw(
                this._player.getX() - topLeftX,
                this._player.getY() - topLeftY,
                this._player.getChar(),
                this._player.getForeground(), 
                this._player.getBackground()
                );
        
        
    },
    handleInput: function(inputType, inputData){
        if(inputType === 'keydown'){
            
            if(inputData.keyCode === ROT.VK_SPACE){
                Game.switchScreen(Game.Screen.winScreen);
            }
            else if(inputData.keyCode === ROT.VK_ESCAPE){
                Game.switchScreen(Game.Screen.loseScreen);
            }
            //Movement
            if(inputData.keyCode === ROT.VK_LEFT){
                this.move(-1,0);
            }
            else if(inputData.keyCode === ROT.VK_RIGHT){
                this.move(1,0);
            }
            else if(inputData.keyCode === ROT.VK_UP){
                this.move(0,-1);
            }
            else if(inputData.keyCode === ROT.VK_DOWN){
                this.move(0,1);
            }
        }
    },
    move: function(dX,dY){
        var newX = this._player.getX() + dX;
        var newY = this._payer.getY() + dY;
        
        this._player.tryMove(newX,newY,this._map);
    }
}

Game.Screen.winScreen = {
    
    enter: function(){console.log("Entered win screen");},
    exit: function(){console.log("Exited the win screen");},
    render: function(display){
        
        for(var i = 0; i < 22; i++){
            
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            
            var background = ROT.background = ROT.Color.toRGB([r,g,b]);
            
            display.drawText(2,i+1,"%b{" + background + "}You win!");
        }
    },
    handleInput:function(inputType, inputData){
        //placeholder
        
    }
}
    
    
Game.Screen.loseScreen = {
    
    enter: function(){console.log("Entered lose screen");},
    exit: function(){console.log("Exited the lose screen");},
    render: function(display){
        
        for(var i = 0; i < 22; i++){
            
            display.drawText(2,i+1,"%b{red}You lose!");
        }
    },
    handleInput:function(inputType, inputData){
        //placeholder
        
    }
}    
    
    
    
    
 


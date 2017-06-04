/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



    var Game = {
         _display:null,
        _currentScreen:null,
        _screenWidth:80,
        _screenHeight:24,
        
        init:function(){
            this._display = new ROT.Display({width: this._screenWidth,
                                            height: this._screenHeight});
            
            var game = this;
            
            var bindEventToScreen  = function(event){
                
                window.addEventListener(event, function(e){
                        if (game._currentScreen !== null){
                            game._currentScreen.handleInput(event, e);
                            game._display.clear();
                            game._currentScreen.render(game._display);
                        }
                        });
            }
            
            bindEventToScreen('keydown');
            bindEventToScreen('keyup');
            bindEventToScreen('keypress');
        },
        getDisplay:function(){
            return this._display;
        },
        getScreenWidth: function(){
            return this._screenWidth;
        },
        getScreenHeight: function(){
            return this._screenHeight;
        },
        switchScreen: function(screen){
            if(this._currentScreen !== null){
                this._currentScreen.exit();
            }
            //if we've already instantiated a screen, we should clear it
            this.getDisplay().clear();
            
            this._currentScreen = screen;
            
            if(!this._currentScreen !== null){
                this._currentScreen.enter();
                this._currentScreen.render(this._display);
            }
            else{
                console.log("The screen passed to switchScreen was null");
            }
            
        }
    };
    
    window.onload = function(){
        if(!ROT.isSupported()){
            alert("The rot.js library isn't supported by your browser, sorry!");
        }else{
            Game.init();
            document.body.appendChild(Game.getDisplay().getContainer());
            Game.switchScreen(Game.Screen.startScreen);
        }
    };
    
    

    
    
    

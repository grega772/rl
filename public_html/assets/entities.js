/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Game.Mixins = {};

Game.Mixins.Moveable = {
    
    name: 'Movable',
    tryMove: function(x,y,map){
        
        var tile = map.getTile(x,y);
        
        if(tile.isWalkable()){
            
            this._x = x;
            this._y = y;
            return true;
            
        }else if(tile.isDiggable()){
            map.dig(x,y);
            return true;
        }
        return false;
    }
}

Game.Screen.playScreen = {
    _map:null,
    _player:null,
    enter:function(){
        
    }
}

























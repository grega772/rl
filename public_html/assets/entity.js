/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Game.Entity = function(properties){
    
    properties || {};
    
    Game.Glyph.call(this,properties);
    
    this._name = properties.name || '';
    this._x = properties.x || 0;
    this._y = properties.y || 0;
    
    this._attachedMixins = {};
    
    var mixins = properties.mixins || [];
    
    for(var i =0;i<mixins.length;i++){
        
        for(var key in mixins[i]){
            if(key!='init' && key!='name'&&!this.hasOwnProperty(key)){
                this[key] = mixins[i][key];
            }
        }
     this._attachedMixins[mixins[i.name]] = true;
        if(mixins[i].init){
            mixins[i].init.call(this,properties);
        }
    }
};

Game.Entity.prototype.setName = function(name){
    this._name = name;
}

Game.Entity.getName = function(){
    return this._name;
}

Game.Entity.setX = function(x){
    this._x = x;
}

Game.Entity.getX = function(){
    return this._x;
}

Game.Entity.prototype.setY = function(y){
    this._y = y;
}

Game.Entity.prototype.getY = function(){
    return this._y;
}

Game.Entity.prototype.hasMixin = function(obj){
    
    if(typeof obj === 'object'){
        return this_attachedMixins[obj.name];
    }else{
        return this._attachedMixins[name];
    }
}


















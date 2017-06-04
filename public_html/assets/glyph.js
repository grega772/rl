/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Game.Glyph = function(properties){
    properties = properties || {};
    this._char = properties['character'] || ' ';
    this._foreground = properties['foreground'] || 'white';
    this._background = properties['background'] || 'black';
};
Game.Glyph.prototype.getChar = function(){
    return this._char;
}
Game.Glyph.prototype.getBackground = function(){
    return this._background;
}
Game.Glyph.prototype.getForeground = function(){
    return this._foreground;
}











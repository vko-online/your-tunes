/*** @jsx React.DOM */
var React = require('react'),

UxWatchMixin = require('../mixins/ux_watch_mixin'),
UxStore = require('../stores/ux_store'),
UxActions = require('../actions/ux_actions'),
PLAYLIST_CONTAINER = require('./playlist_container'),
PLAYLIST = require('./playlist'),
TOP_BAR = require('./top_bar'),
MID_BAR = require('./mid_bar'),
BOT_BAR = require('./bot_bar');

var inset_style = {
	fontSize: 14,
	width: 200,
	height: 200,
	backgroundSize: 'auto 100%',
	backgroundImage: "url('../assets/song-image.jpg')",
	position: 'relative'
};
var outset_style = {
	position: 'absolute',
	display: 'inline-block',
	overflow: 'hidden',
	height: 'auto',
	userSelect: 'none',
	WebkitUserSelect: 'none',
	border: '1px solid #aaa',
	borderRadius: 6,
	boxShadow: '3px 3px 30px #bbb'
};


var _mouse_down = false;
var startX = 0, startY = 0, x = 0, y = 0;
function _mouseDown(event){
	_mouse_down = true;
	startX = event.pageX - x;
	startY = event.pageY - y;
}
function _mouseMove(event){
	if(_mouse_down && !UxStore.volume_visible()){
		y = event.pageY - startY;
        x = event.pageX - startX;
		UxActions.set_position(x,y);
	}
}
function _mouseUp(event){
	_mouse_down = false;
}
function _aspect_value_setter(obj, value){
	obj.height = obj.width = value;
	return obj;
}
function _position_setter(obj, _x, _y){
	obj.left = _x;
	obj.top = _y;
	return obj;
}

function _state_watcher(){
	return {
		aspect_value: UxStore.get_aspect_value(),
		position_x: UxStore.get_position().x,
		position_y: UxStore.get_position().y
	}
}
var APP = 
React.createClass({
	mixins: [UxWatchMixin(_state_watcher)],
	render: function(){
		return  <div className="js-drag" style={_position_setter(outset_style, this.state.position_x, this.state.position_y)} onMouseDown={_mouseDown} onMouseMove={_mouseMove} onMouseUp={_mouseUp}>
		<div style={_aspect_value_setter(inset_style, this.state.aspect_value)}>
		<TOP_BAR />
		<BOT_BAR />
		</div>
		<PLAYLIST_CONTAINER />
		</div>
	}
});
module.exports = APP;
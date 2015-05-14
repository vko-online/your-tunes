var AppDispatcher = require('../dispatchers/app_dispatcher');
var AppConstants = require('../constants/app_constants');
var _ = require('lodash');
var merge = _.extend;
var EventEmitter = require('events').EventEmitter;



var STYLES ={
	buttons: {
		active: {
			color: 'blue'
		},
		inactive: {
			color: 'inherit'
		}
	},
	volume_track: {
		active: {
			display: 'inline'
		},
		inactive: {
			display: 'none'
		}
	}
}
var STATE = {
	PLAYLIST_SHOWING: false,
	SEARCH_SHOWING: false,
	DROPDOWN_SHOWING: false,
	VOLUME_SHOWING: false,
	UX_CONTROLS_SHOWING: true,
	TRACK_THUMB_SHOWING: false,
	ASPECT_VALUE: 200,
	ASPECT_VALUE_SMALL: 200,
	ASPECT_VALUE_NORMAL: 400,
	ASPECT_VALUE_MAX: 600,
	POSITION_X: 0,
	POSITION_Y: 0,
	VOLUME_VALUE: 5
};


var __localstorage_key = 'state';
function __save_state(name, value){
	localStorage.setItem(name, JSON.stringify(value))
}
function __load_state(name){
	return JSON.parse(localStorage.getItem(name));
}
window.clean_ux_storage = function(){
	localStorage.removeItem(__localstorage_key);
}
STATE = __load_state(__localstorage_key) || STATE;






function _search_visibility_setter(show){
	STATE.SEARCH_SHOWING = show;
}
function _playlist_visibility_setter(show){
	STATE.PLAYLIST_SHOWING = show;
}
function _dropdown_visibility_setter(show){
	STATE.DROPDOWN_SHOWING = show;
}
function _volume_visibility_setter(show){
	STATE.VOLUME_SHOWING = show;
}
function _ux_controls_visibility_setter(show){
	STATE.UX_CONTROLS_SHOWING = show;
}
function _track_thumb_visibility_setter(show){
	STATE.TRACK_THUMB_SHOWING = show;
}
function _set_aspect_value(value){
	STATE.ASPECT_VALUE = value || STATE.ASPECT_VALUE;
}
function _set_position(x,y){
	STATE.POSITION_X = x > 0 ? x : 0;
	STATE.POSITION_Y = y > 0 ? y : 0;
}
function _set_volume_value(value){
	STATE.VOLUME_VALUE = value;
}

var uxStore = merge(EventEmitter.prototype, {
	emitChange: function(){
		this.emit(AppConstants.CHANGE_EVENT_UX);
	},
	addChangeListener: function(callback){
		this.on(AppConstants.CHANGE_EVENT_UX, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(AppConstants.CHANGE_EVENT_UX, callback);
	},


	
	get_state_styles: function(){
		return STYLES;
	},
	get_aspect_value: function(){
		return STATE.ASPECT_VALUE;
	},
	playlist_visible: function(){
		return STATE.PLAYLIST_SHOWING;
	},
	volume_visible: function(){
		return STATE.VOLUME_SHOWING;
	},
	volume_value: function(){
		return STATE.VOLUME_VALUE;
	},
	search_visible: function(){
		return STATE.SEARCH_SHOWING;
	},
	dropdown_visible: function(){
		return STATE.DROPDOWN_SHOWING;
	},
	ux_controls_visible: function(){
		return STATE.UX_CONTROLS_SHOWING;
	},
	track_thumb_visible: function(){
		return STATE.TRACK_THUMB_SHOWING;
	},
	get_position: function(){
		return {
			x: STATE.POSITION_X,
			y: STATE.POSITION_Y
		}
	},

	
	dispatcherIndex:AppDispatcher.register(function(payload){
		var action =  payload.action;
		switch(action.actionType){


			case AppConstants.PLAYLIST_SHOW: 
			_playlist_visibility_setter(true);
			break;
			case AppConstants.PLAYLIST_HIDE: 
			_playlist_visibility_setter(false);
			break;


			case AppConstants.SEARCH_SHOW: 
			_search_visibility_setter(true);
			break;
			case AppConstants.SEARCH_HIDE: 
			_search_visibility_setter(false);
			break;


			case AppConstants.DROPDOWN_SHOW: 
			_dropdown_visibility_setter(true);
			break;
			case AppConstants.DROPDOWN_HIDE: 
			_dropdown_visibility_setter(false);
			break;


			case AppConstants.VOLUME_SHOW: 
			_volume_visibility_setter(true);
			break;
			case AppConstants.VOLUME_HIDE: 
			_volume_visibility_setter(false);
			break;
			case AppConstants.VOLUME: 
			_set_volume_value(payload.action.volume);
			break;


			case AppConstants.UX_CONTROLS_SHOW: 
			_ux_controls_visibility_setter(true);
			break;
			case AppConstants.UX_CONTROLS_HIDE: 
			_ux_controls_visibility_setter(false);
			break;


			case AppConstants.TRACK_THUMB_SHOW: 
			_track_thumb_visibility_setter(true);
			break;
			case AppConstants.TRACK_THUMB_HIDE: 
			_track_thumb_visibility_setter(false);
			break;


			case AppConstants.ASPECT: 
			_set_aspect_value(payload.action.aspect_value);
			break;

			case AppConstants.POSITION: 
			_set_position(payload.action.x, payload.action.y);
			break;

		}
		uxStore.emitChange();
		__save_state(__localstorage_key, STATE);
		return true;
	})
});

module.exports = uxStore;
var AppDispatcher = require('../dispatchers/app_dispatcher');
var AppConstants = require('../constants/app_constants');
var _ = require('lodash');
var merge = _.extend;
var EventEmitter = require('events').EventEmitter;




var tracks = [
{
	artist: 'Баста',
	album: 'Баста 4',
	title: '01 Интро',
	src: '../assets/tracks/01%20%D0%98%D0%BD%D1%82%D1%80%D0%BE.mp3'
},{
	artist: 'Баста',
	album: 'Баста 4',
	title: '02 Это Дороже Денег',
	src: '../assets/tracks/02%20%D0%AD%D1%82%D0%BE%20%D0%94%D0%BE%D1%80%D0%BE%D0%B6%D0%B5%20%D0%94%D0%B5%D0%BD%D0%B5%D0%B3.mp3'
}, {
	artist: 'Баста',
	album: 'Баста 4',
	title: '03 Мама',
	src: '../assets/tracks/03%20%D0%9C%D0%B0%D0%BC%D0%B0.mp3'
}
];
var audio;
var current_index = undefined;
//TODO: bug here
//maybe install audio.js
//
function _play_tune(index){
	//need this to detect if track available on app load
	//if not, get first
	current_index = current_index || 0;
	current_index = index || current_index;
	audio = new Audio();
	var track_src = tracks[current_index].src;
	if(track_src == audio.currentSrc){
		audio.pause();
	} else {
		audio = undefined;
		audio = new Audio();
		audio.src = tracks[current_index].src;
		audio.play();
	}
	
	// if(audio){
	// 	audio = 
	// } else {
	// 	audio = new Audio(tracks[index].src);
	// }
	// if(!audio.src){
	// 	audio.src = tracks[index].src;
	// } 
	audio.play();
}
function _pause_tune(){
	console.log('_pause_tune')
	audio.pause();
}
function _search(query){

}
var tuneStore = merge(EventEmitter.prototype, {
	emitChange: function(){
		this.emit(AppConstants.CHANGE_EVENT_TUNE);
	},
	addChangeListener: function(callback){
		this.on(AppConstants.CHANGE_EVENT_TUNE, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(AppConstants.CHANGE_EVENT_TUNE, callback);
	},

	is_current_track_available: function(){
		return typeof current_index != 'undefined';
	},
	get_tracks: function(){
		return tracks;
	},
	get_current_track: function(){
		return tracks[current_index];
	},
	is_current_track: function(index){
		return tracks[index].src == audio.currentSrc;
	},
	get_current_time: function(){
		return audio.currentTime;
	},
	get_current_duration: function(){
		return audio.duration;
	},
	is_playing: function(){
		return audio && !audio.paused;
	},
	get_next: function(){
		return current_index + 1;
	},
	get_prev: function(index){
		return current_index - 1;
	},
	dispatcherIndex:AppDispatcher.register(function(payload){
		var action =  payload.action;
		console.log('action', action);
		switch(action.actionType){
			case AppConstants.PLAY: 
			_play_tune(payload.action.index);
			break;

			case AppConstants.PAUSE: 
			_pause_tune();
			break;

			case AppConstants.NEXT: 
			_play_tune(payload.action.index);
			break;

			case AppConstants.PREV: 
			_play_tune(payload.action.index);
			break;

			case AppConstants.SEARCH: 
			_search(payload.action.query);
			break;
		}
		tuneStore.emitChange();
		return true;
	})
});

module.exports = tuneStore;
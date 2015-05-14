var AppConstants = require('../constants/app_constants');
var AppDispatcher = require('../dispatchers/app_dispatcher');


var UxActions = {
	show_playlist: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.PLAYLIST_SHOW
		});
	},
	hide_playlist: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.PLAYLIST_HIDE
		});
	},
	set_position: function(x, y){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.POSITION,
			x: x,
			y: y
		});
	},
	set_volume: function(value){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.VOLUME,
			volume: value
		});
	},
	show_volume: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.VOLUME_SHOW
		});
	},
	hide_volume: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.VOLUME_HIDE
		});
	},
	//other actions
};

module.exports = UxActions;

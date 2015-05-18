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
	show_controls: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.UX_CONTROLS_SHOW
		});
	},
	hide_controls: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.UX_CONTROLS_HIDE
		});
	},
	show_collapsed: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SIZE_COLLAPSE_SHOW
		});
	},
	hide_collapsed: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SIZE_COLLAPSE_HIDE
		});
	}
	//other actions
};

module.exports = UxActions;

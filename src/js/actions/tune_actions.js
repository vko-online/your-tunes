var AppConstants = require('../constants/app_constants');
var AppDispatcher = require('../dispatchers/app_dispatcher');


var TuneActions = {
	play: function(index){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.PLAY,
			index: index
		});
	},
	pause: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.PAUSE
		});
	},
	next: function(index){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.NEXT,
			index: index
		});
	},
	prev: function(index){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.PREV,
			index: index
		});
	}
};

module.exports = TuneActions;

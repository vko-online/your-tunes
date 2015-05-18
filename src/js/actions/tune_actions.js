var AppConstants = require('../constants/app_constants');
var AppDispatcher = require('../dispatchers/app_dispatcher');


var TuneActions = {
    play: function (index) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.PLAY,
            index: index
        });
    },
    pause: function () {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.PAUSE
        });
    },
    next: function (index) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.NEXT,
            index: index
        });
    },
    prev: function (index) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.PREV,
            index: index
        });
    },
    seek: function (value) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SEEK,
            value: value
        });
    },
    volume: function (value) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.VOLUME,
            value: value
        });
    },
    register_adapter: function (adapter) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.REGISTER_ADAPTER,
            adapter: adapter
        });
    },
    activate_adapter: function(adapter_code){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ACTIVATE_ADAPTER,
            adapter_code: adapter_code
        });
    }
};

module.exports = TuneActions;

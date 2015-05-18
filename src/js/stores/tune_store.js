var AppDispatcher = require('../dispatchers/app_dispatcher');
var AppConstants = require('../constants/app_constants');
var UxStore = require('../stores/ux_store');
var _ = require('lodash');
var merge = _.extend;
var EventEmitter = require('events').EventEmitter;
var LocalStorageService = require('../utils/local_storage_service');

EventEmitter.defaultMaxListeners = 15;


//note, current implementation of adapters doesn't support promises;
var TUNE_STATE_TEMP = {
    AUDIO: undefined,
    ADAPTERS: []
};
var TUNE_STATE = {
    ACTIVE_INDEX: undefined,
    ACTIVE_ADAPTER: undefined,
    ACTIVE_ADAPTER_CODE: undefined,
    TIME: undefined
};
TUNE_STATE = LocalStorageService.load_state(AppConstants.LOCAL_STORAGE_TUNE_STATE_KEY) || TUNE_STATE;

if (TUNE_STATE.ACTIVE_ADAPTER_CODE) {
    TUNE_STATE.ACTIVE_ADAPTER = TUNE_STATE_TEMP.ADAPTERS.filter(function (i) {
        return i.code === TUNE_STATE.ACTIVE_ADAPTER_CODE;
    })[0];
}
//TODO: bug here
//maybe install audio.js or something
function _play_tune(index) {
    //maybe optimization here/???
    if (index) {
        if (TUNE_STATE_TEMP.AUDIO && (TUNE_STATE.ACTIVE_INDEX === index)) {
            TUNE_STATE_TEMP.AUDIO.pause();
        } else {
            TUNE_STATE.ACTIVE_INDEX = index;
            var track = TUNE_STATE.ACTIVE_ADAPTER.get_track_by_id(TUNE_STATE.ACTIVE_INDEX);
            TUNE_STATE_TEMP.AUDIO = new Audio(track[TUNE_STATE.ACTIVE_ADAPTER.keys.track_source_key]);
            TUNE_STATE_TEMP.AUDIO.play();
        }
    } else {
        if(TUNE_STATE.ACTIVE_INDEX > -1){
            var track = TUNE_STATE.ACTIVE_ADAPTER.get_track_by_id(TUNE_STATE.ACTIVE_INDEX);
            TUNE_STATE_TEMP.AUDIO = new Audio(track[TUNE_STATE.ACTIVE_ADAPTER.keys.track_source_key]);
            TUNE_STATE_TEMP.AUDIO.play();
        } else {
            var track = TUNE_STATE.ACTIVE_ADAPTER.get_track_by_id(undefined);
            TUNE_STATE_TEMP.AUDIO = new Audio(track[TUNE_STATE.ACTIVE_ADAPTER.keys.track_source_key]);
            TUNE_STATE_TEMP.AUDIO.play();
        }
    }
    TUNE_STATE_TEMP.AUDIO.volume = UxStore.volume_value();
}
function _pause_tune() {
    TUNE_STATE_TEMP.AUDIO.pause();
}
function _seek(value) {
    var calculated = Math.round((value * TUNE_STATE_TEMP.AUDIO.duration) / 100);
    TUNE_STATE_TEMP.AUDIO.currentTime = calculated;
}
function _search(query) {

}
function _volume(value) {
    if (TUNE_STATE_TEMP.AUDIO) {
        TUNE_STATE_TEMP.AUDIO.volume = value;
    }
}

function _register_adapter(adapter) {
    console.log('_register_adapter', adapter);
    TUNE_STATE_TEMP.ADAPTERS.push(adapter);

    if(TUNE_STATE.ACTIVE_ADAPTER_CODE){
        TUNE_STATE.ACTIVE_ADAPTER = TUNE_STATE_TEMP.ADAPTERS.filter(function (adapter) {
            return adapter.code == TUNE_STATE.ACTIVE_ADAPTER_CODE;
        })[0];
    }
}
function _activate_adapter(adapter_code) {
    TUNE_STATE.ACTIVE_ADAPTER = TUNE_STATE_TEMP.ADAPTERS.filter(function (adapter) {
        return adapter.code == adapter_code;
    })[0];
    TUNE_STATE.ACTIVE_ADAPTER_CODE = adapter_code;
}
var tuneStore = merge(EventEmitter.prototype, {
    emitChange: function () {
        this.emit(AppConstants.CHANGE_EVENT_TUNE);
    },
    addChangeListener: function (callback) {
        this.on(AppConstants.CHANGE_EVENT_TUNE, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(AppConstants.CHANGE_EVENT_TUNE, callback);
    },


    is_adapter_selected: function () {
        return TUNE_STATE.ACTIVE_ADAPTER != undefined;
    },
    get_active_adapter: function () {
        return TUNE_STATE.ACTIVE_ADAPTER;
    },
    get_adapters: function () {
        return TUNE_STATE_TEMP.ADAPTERS;
    },
    is_current_track_available: function () {
        return !isNaN(TUNE_STATE.ACTIVE_INDEX);
    },
    get_tracks: function () {
        return TUNE_STATE.ACTIVE_ADAPTER && TUNE_STATE.ACTIVE_ADAPTER.get_tracks();
    },
    get_current_track: function () {
        if (TUNE_STATE.ACTIVE_INDEX > -2)
            return TUNE_STATE.ACTIVE_ADAPTER.get_track_by_id(TUNE_STATE.ACTIVE_INDEX);
    },
    is_current_track: function (index) {
        return TUNE_STATE_TEMP.AUDIO && (TUNE_STATE.ACTIVE_INDEX == index);
    },
    get_current_time: function () {
        return TUNE_STATE_TEMP.AUDIO && Math.round(TUNE_STATE_TEMP.AUDIO.currentTime);
    },
    get_current_duration: function () {
        return TUNE_STATE_TEMP.AUDIO && Math.round(TUNE_STATE_TEMP.AUDIO.duration);
    },
    is_playing: function () {
        return TUNE_STATE_TEMP.AUDIO && !TUNE_STATE_TEMP.AUDIO.paused;
    },
    get_next: function () {
        return TUNE_STATE.ACTIVE_INDEX + 1;
    },
    get_prev: function (index) {
        return TUNE_STATE.ACTIVE_INDEX - 1;
    },
    dispatcherIndex: AppDispatcher.register(function (payload) {
        var action = payload.action;
        console.log('action', action);
        switch (action.actionType) {
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


            case AppConstants.SEEK:
                _seek(payload.action.value);
                break;


            case AppConstants.VOLUME:
                _volume(payload.action.value);
                break;

            case AppConstants.REGISTER_ADAPTER:
                _register_adapter(payload.action.adapter);
                break;

            case AppConstants.ACTIVATE_ADAPTER:
                _activate_adapter(payload.action.adapter_code);
                break;

        }
        tuneStore.emitChange();
        LocalStorageService.save_state(AppConstants.LOCAL_STORAGE_TUNE_STATE_KEY, TUNE_STATE);
        return true;
    })
});

module.exports = tuneStore;
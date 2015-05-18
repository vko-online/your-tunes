/*** @jsx React.DOM */
var React = require('react'),
    TuneActions = require('../actions/tune_actions'),
    TuneStore = require('../stores/tune_store'),
    TuneWatchMixin = require('../mixins/tune_watch_mixin');


var playing_track_style = {
    fontWeight: 200
};

var list_style = {
    margin: 0,
    padding: 10,
    listStyle: 'none'
};
function get_tracks() {
    return {
        tracks: TuneStore.get_tracks()
    }
}

//TODO: highlight current track in ol.li
function is_current_playing(index) {
    return TuneStore.is_current_track(index);
}

var PLAYLIST =
    React.createClass({
        mixins: [TuneWatchMixin(get_tracks)],
        handleClick: function (index) {
            var int_index = parseInt(index.target.getAttribute('data-index'));
            TuneActions.play(int_index);
        },
        render: function () {

            var ADAPTER = TuneStore.get_active_adapter();

            var that = this;
            var li_tracks = (this.state.tracks && ADAPTER.keys) ? this.state.tracks.map(function (track, index) {
                return <li onClick={that.handleClick} key={index} style={{padding: '2px 0'}}>
                    <div data-index={track[ADAPTER.keys.track_identification_key]} style={{display: 'flex', height: 40}}>
                        <img data-index={track[ADAPTER.keys.track_identification_key]}  style={{flex: .3}}/>

                        <div
                            style={{flex: 1, paddingLeft: 5, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                            <div>
                                <label data-index={track[ADAPTER.keys.track_identification_key]}
                                       style={is_current_playing(index) ? playing_track_style : undefined }>{track[ADAPTER.keys.track_title_key]}
                                </label>
                            </div>
                            <div>
                                <label data-index={track[ADAPTER.keys.track_identification_key]}>{track[ADAPTER.keys.track_album_key]}</label>
                            </div>
                        </div>
                    </div>
                </li>
            }) : undefined;
            return <ul style={list_style}>{li_tracks}</ul>
        }
    });
module.exports = PLAYLIST;
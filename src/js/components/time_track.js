/*** @jsx React.DOM */
var React = require('react'),
    TuneActions = require('../actions/tune_actions'),
    TuneStore = require('../stores/tune_store'),
    TuneWatchMixin = require('../mixins/tune_watch_mixin'),
    merge = require('lodash').extend;


var style = {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    left: 0,
    opacity: 1,
    right: 0
};
var time_span_style = {
    flex: .3,
    textAlign: 'center'
};
var track_style = {
    flex: 1
};
var interval;

function seconds_time_string(val) {
    if (!val) {
        return '';
    }
    return ((val - (val % 60)) / 60) + ':' + ((val % 60) > 9 ? (val % 60) : '0' + (val % 60))
}
function track_time_watcher() {
    return {
        duration: seconds_time_string(TuneStore.get_current_duration() - TuneStore.get_current_time()),
        current_time: seconds_time_string(TuneStore.get_current_time()),
        time_track_value: Math.round((TuneStore.get_current_time() * 100) / TuneStore.get_current_duration())
        //is_current_track_available: TuneStore.is_current_track_available()
    }
}
var TIME_TRACK =
    React.createClass({
        //mixins: [TuneWatchMixin(track_time_watcher)],
        getInitialState: function () {
            return track_time_watcher();
        },
        componentWillMount: function () {
            interval = setInterval(this.getCurrentTime, 1000);
        },
        componentWillUnmount: function () {
            clearInterval(interval);
        },
        getCurrentTime: function () {
            this.setState(track_time_watcher());
        },
        handleChange: function (event) {
            var input_val = parseInt(event.target.value);
            TuneActions.seek(input_val);
        },
        render: function () {
            //this.state.is_current_track_available ? style : merge(style, {opacity: 0})
            return <div title="TIME_TRACK" style={style}>
                <span style={time_span_style}>{this.state.current_time}</span>
                <input type="range" onChange={this.handleChange} value={this.state.time_track_value}
                       style={track_style}/>
                <span style={time_span_style}>{this.state.duration}</span>
            </div>
        }
    });
module.exports = TIME_TRACK;
/*** @jsx React.DOM */
var React = require('react'),
TuneActions = require('../actions/tune_actions'),
TuneStore = require('../stores/tune_store'),
TuneWatchMixin = require('../mixins/tune_watch_mixin'),
merge = require('lodash').extend;



var style = {
	background: '#eee',
	position: 'absolute',
	bottom: 0,
	left: 0,
	opacity: 1,
	right: 0
};


function track_time_watcher(){
	return {
		duration: 0,
		current_time: 0,
		time_track_value: 0,
		is_current_track_available: TuneStore.is_current_track_available()
	}
}
var TIME_TRACK = 
	React.createClass({
		mixins: [TuneWatchMixin(track_time_watcher)],
		render: function(){
			//this.state.is_current_track_available ? style : merge(style, {opacity: 0})
			return <div title="TIME_TRACK" style={style}>
						<span>{this.state.current_time}</span>
							<input type="range" value={this.state.time_track_value}/>
						<span>{this.state.duration}</span>
					</div>
		}
	});
module.exports = TIME_TRACK;
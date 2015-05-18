/*** @jsx React.DOM */
var React = require('react'),
UxStore = require('../stores/ux_store'),
TuneActions = require('../actions/tune_actions'),
UxActions = require('../actions/ux_actions'),
UxWatchMixin = require('../mixins/ux_watch_mixin'),
merge = require('lodash').extend;

var style = {
	position: 'absolute',
	bottom: 20,
	left: -27,
	width: 70
};

//TODO: maybe we should not save state of volume bar visibility?
function volume_track_watcher(){
	return {
		volume_value: UxStore.volume_value(),
		volume_visible: UxStore.volume_visible()
	}
}
function get_store_style(state){
	if(state){
		return merge(UxStore.get_state_styles().volume_track.active, style);
	} else {
		return merge(UxStore.get_state_styles().volume_track.inactive, style);
	}
}
var VOLUME_TRACK = 
React.createClass({
	mixins: [UxWatchMixin(volume_track_watcher)],
	timeout: null,
	handleChange: function(event){
		if(this.timeout){
			clearTimeout(this.timeout);
			this.timeout = null;
		}
		
		var input_val = parseInt(event.target.value) / 10;
		UxActions.set_volume(input_val);
		TuneActions.volume(input_val);
	 	this.timeout = setTimeout(function() {
			UxActions.hide_volume();
			clearTimeout(this.timeout);
			this.timeout = null;
		}.bind(this), 2000);
	},
	render: function(){
		return <input title="VOLUME_TRACK" style={get_store_style(this.state.volume_visible)} type="range" mix="0" max="10" value={this.state.volume_value} onChange={this.handleChange}/>
	}
});
module.exports = VOLUME_TRACK;
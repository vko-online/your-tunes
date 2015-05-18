/*** @jsx React.DOM */
var React = require('react'),
ICON = require('./icon'),
TuneWatchMixin = require('../mixins/tune_watch_mixin'),
TuneStore = require('../stores/tune_store');

var artist_style = {
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap'
};
var logo_style = {
	textAlign: 'center',
	fontSize: 24,
	paddingTop: 10,
	height: '100%'
};
var wrapper_style = {
	height: '100%'
};
function get_track_watcher(){
	return {
		track: TuneStore.get_current_track()
	}
}

var TITLE_TRACK = 
React.createClass({
	mixins: [TuneWatchMixin(get_track_watcher)],
	render: function(){
		return <div title="TITLE_TRACK">
		<div>
		<div>{this.state.track && this.state.track.title}</div>
		<div>
		<em style={artist_style}>{this.state.track && this.state.track.artist + ' - '} {this.state.track && this.state.track.album}</em>
		</div>
		</div>
		<div style={logo_style}><ICON class="apple"/></div>
		</div>
	}
});
module.exports = TITLE_TRACK;
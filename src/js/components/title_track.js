/*** @jsx React.DOM */
var React = require('react'),

TuneWatchMixin = require('../mixins/tune_watch_mixin'),
TuneStore = require('../stores/tune_store');

var artist_style = {
	textOverflow: 'ellipsis',
  	overflow: 'hidden',
  	whiteSpace: 'nowrap'
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
				<span>{this.state.track && this.state.track.title}</span>
				<br />
				<em style={artist_style}>{this.state.track && this.state.track.artist + ' - '} {this.state.track && this.state.track.album}</em>
			</div>
		}
	});
module.exports = TITLE_TRACK;
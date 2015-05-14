/*** @jsx React.DOM */
var React = require('react'),
TuneActions = require('../actions/tune_actions'),
TuneStore = require('../stores/tune_store'),
TuneWatchMixin = require('../mixins/tune_watch_mixin'),
ICON = require('./icon');


var style = {
	fontSize: 16
};


function is_playing(){
	return {is_playing: TuneStore.is_playing()};
}

var PLAY_BUTTON = 
React.createClass({
	mixins: [TuneWatchMixin(is_playing)],
	playClick: function(){
		TuneActions.play();
	},
	pauseClick: function(){
		TuneActions.pause();
	},
	render: function(){

		return <span style={style} title="play" onClick={this.state.is_playing ? this.pauseClick : this.playClick}>
					<ICON class={this.state.is_playing ? 'pause' : 'play'} />
				</span>
	}
});
module.exports = PLAY_BUTTON;
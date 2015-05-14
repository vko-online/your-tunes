/*** @jsx React.DOM */
var React = require('react'),
TuneActions = require('../actions/tune_actions'),
TuneStore = require('../stores/tune_store'),
TuneWatchMixin = require('../mixins/tune_watch_mixin');


function get_tracks(){
	return {
		tracks: TuneStore.get_tracks()
	}
}

//TODO: highlight current track in ol.li
function is_current_playing(id){
	return TuneStore.get_tracks().filter(function(i){
		i.id === id;
	}).length > 0;
}

var PLAYLIST = 
	React.createClass({
		mixins: [TuneWatchMixin(get_tracks)],
		handleClick: function(index){
			var int_index = parseInt(index.target.getAttribute('data-index'));
			TuneActions.play(int_index);
		},
		render: function(){
			var that = this;
			var li_tracks = this.state.tracks.map(function(track, index){
				return <li onClick={that.handleClick} key={index}>
				<em data-index={index}>{track.title}</em>
				</li>
			})
			return <ol>
				{li_tracks}
			</ol>
		}
	});
module.exports = PLAYLIST;
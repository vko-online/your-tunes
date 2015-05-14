/*** @jsx React.DOM */
var React = require('react'),
PLAYLIST = require('./playlist'),
UxActions = require('../actions/ux_actions'),
UxStore = require('../stores/ux_store'),
UxWatchMixin = require('../mixins/ux_watch_mixin');


var active_style = {
	display: 'block',
	maxHeight: 500,
	overflow: 'hidden',
	transition: '2s ease'
};
var inactive_style = {
	display: 'block',
	maxHeight: 0,
	overflow: 'hidden',
	transition: '.5s ease'
};

function get_playlist_state(){
	return {
		playlist_visible: UxStore.playlist_visible()
	}
}
var PLAYLIST_CONTAINER = 
	React.createClass({
		mixins: [UxWatchMixin(get_playlist_state)],
		render: function(){
			return <div style={this.state.playlist_visible ? active_style : inactive_style}>
				 <PLAYLIST />
			</div>
		}
	});
module.exports = PLAYLIST_CONTAINER;
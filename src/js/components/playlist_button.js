/*** @jsx React.DOM */
var React = require('react'),
UxActions = require('../actions/ux_actions'),
UxStore = require('../stores/ux_store'),
UxWatchMixin = require('../mixins/ux_watch_mixin')
ICON = require('./icon');



var playlist_button_active = {
	color: 'blue'
}

var playlist_button_inactive = {
	color: 'inherit'
}

function playlist_visible(){
	return {
		playlist_visible: UxStore.playlist_visible()
	}
}

var PLAYLIST_BUTTON = 
React.createClass({
	mixins: [UxWatchMixin(playlist_visible)],
	handleClick: function(){
		if(UxStore.playlist_visible()){
			UxActions.hide_playlist();
		} else {
			UxActions.show_playlist();
		}
	},
	render: function(){
		return <span title="close" onClick={this.handleClick} style={this.state.playlist_visible ? playlist_button_active: playlist_button_inactive}>
					<ICON class="th-list" />
				</span>
	}
});
module.exports = PLAYLIST_BUTTON;
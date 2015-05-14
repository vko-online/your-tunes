/*** @jsx React.DOM */
var React = require('react'),
VOLUME_TRACK = require('./volume_track'),
UxStore = require('../stores/ux_store'),
UxActions = require('../actions/ux_actions'),
UxWatchMixin = require('../mixins/ux_watch_mixin'),
ICON = require('./icon');


var outer_style = {
	position: 'relative'
}
var default_style_button = {
	color: 'inherit'
}



function volume_visible_watcher(){
	return {
		volume_visible: UxStore.volume_visible()
	}
}




var VOLUME_BUTTON = 
	React.createClass({
		handleClick: function(){
			if(this.state.volume_visible){
				UxActions.hide_volume();
			} else {
				UxActions.show_volume();
			}
		},
		mixins: [UxWatchMixin(volume_visible_watcher)],
		render: function(){
			return <span title="volume button" style={outer_style} onClick={this.handleClick}>
						<ICON class="volume-up" style={this.state.volume_visible ? UxStore.get_state_styles().buttons.active : UxStore.get_state_styles().buttons.inactive} />
					</span>
		}
	});
module.exports = VOLUME_BUTTON;
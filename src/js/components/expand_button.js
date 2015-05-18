/*** @jsx React.DOM */
var React = require('react'),
UxActions = require('../actions/ux_actions'),
UxStore = require('../stores/ux_store'),
UxWatchMixin = require('../mixins/ux_watch_mixin'),
ICON = require('./icon');


var style = {
	display: 'block'
};


function expand_watcher(){
	return {
		is_expanded: UxStore.is_expanded()
	}
}
var EXPAND_BUTTON = 
	React.createClass({
		mixins: [UxWatchMixin(expand_watcher)],
		handleClick: function(){
			if(this.state.is_expanded){
				UxActions.hide_collapsed();
			} else {
				UxActions.show_collapsed();
			}
		},
		render: function(){
			return <span title="toggle expand" style={style} onClick={this.handleClick}>
						<ICON class={this.state.is_expanded ? 'compress': 'expand'} />
					</span>
		}
	});
module.exports = EXPAND_BUTTON;
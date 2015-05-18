/*** @jsx React.DOM */
var React = require('react'),
UxStore = require('../stores/ux_store'),
UxWatchMixin = require('../mixins/ux_watch_mixin'),
TOP_LEFT_BAR = require('./top_left_bar'),
TuneStore = require('../stores/tune_store'),
TOP_MID_BAR = require('./top_mid_bar'),
TOP_RIGHT_BAR = require('./top_right_bar');


var style = {
	background: 'rgb(198, 198, 198)',
	position: 'absolute',
	top: 0,
	left: 0,
	opacity: 1,
	right: 0,
	zIndex: 10,
	height: 50,
	display: 'flex'
};
var style2 = {
	background: 'rgb(198, 198, 198)',
	position: 'absolute',
	top: 0,
	left: 0,
	zIndex: 10,
	transition: '1s ease',
	opacity: 0,
	right: 0,
	height: 50,
	display: 'flex'
};


function state_watcher(){
	return {
		control_visible: UxStore.ux_controls_visible()
	}
}
var TOP_BAR = 
	React.createClass({
		mixins: [UxWatchMixin(state_watcher)],
		render: function(){
			return <div style={ this.state.control_visible ? style : style2}>
						<TOP_LEFT_BAR />
						<TOP_MID_BAR />
						<TOP_RIGHT_BAR />
					</div>
		}
	});
module.exports = TOP_BAR;
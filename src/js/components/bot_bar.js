/*** @jsx React.DOM */
var React = require('react'),
TIME_TRACK = require('./time_track'),
BOT_LEFT_BAR = require('./bot_left_bar'),
BOT_MID_BAR = require('./bot_mid_bar'),
BOT_RIGHT_BAR = require('./bot_right_bar');


var style = {
	background: '#eee',
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	height: 50
};


var TOP_BAR = 
	React.createClass({
		render: function(){
			return <div style={style}>
						<BOT_LEFT_BAR />
						<BOT_MID_BAR />
						<BOT_RIGHT_BAR />
						<TIME_TRACK />
					</div>
		}
	});
module.exports = TOP_BAR;
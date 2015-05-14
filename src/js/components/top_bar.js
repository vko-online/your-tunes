/*** @jsx React.DOM */
var React = require('react'),
TOP_LEFT_BAR = require('./top_left_bar'),
TOP_MID_BAR = require('./top_mid_bar'),
TOP_RIGHT_BAR = require('./top_right_bar');


var style = {
	background: '#eee',
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	height: 50
};



var TOP_BAR = 
	React.createClass({
		render: function(){
			return <div style={style}>
						<TOP_LEFT_BAR />
						<TOP_MID_BAR />
						<TOP_RIGHT_BAR />
					</div>
		}
	});
module.exports = TOP_BAR;
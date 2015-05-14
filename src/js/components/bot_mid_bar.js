/*** @jsx React.DOM */
var React = require('react'),
CONTROL_BUTTONS = require('./control_buttons');

var style = {
	display: 'inline-block'
};

var BOT_MID_BAR = 
	React.createClass({
		render: function(){
			return <div title="BOT_MID_BAR" style={style}>
						<CONTROL_BUTTONS />
					</div>
		}
	});
module.exports = BOT_MID_BAR;
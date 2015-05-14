/*** @jsx React.DOM */
var React = require('react');

var style = {
	display: 'inline-block',
	float: 'left'
};

var BOT_LEFT_BAR = 
	React.createClass({
		render: function(){
			return <div title="BOT_LEFT_BAR" style={style}>
						<i className="fa fa-repeat"></i>
					</div>
		}
	});
module.exports = BOT_LEFT_BAR;
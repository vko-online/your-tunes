/*** @jsx React.DOM */
var React = require('react'),
CLOSE_BUTTON = require('./close_button'),
EXPAND_BUTTON = require('./expand_button');


var style = {
	display: 'inline-block'
};

var TOP_LEFT_BAR = 
	React.createClass({
		render: function(){
			return <div title="TOP_LEFT_BAR" style={style}>
						<CLOSE_BUTTON />
						<EXPAND_BUTTON />
					</div>
		}
	});
module.exports = TOP_LEFT_BAR;
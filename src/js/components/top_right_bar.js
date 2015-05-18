/*** @jsx React.DOM */
var React = require('react'),
DROPDOWN_BUTTON = require('./dropdown_button');

var style = {
	display: 'inline-block',
	flex: .1
};

var TOP_RIGHT_BAR = 
	React.createClass({
		render: function(){
			return <div title="TOP_RIGHT_BAR" style={style}>
						<DROPDOWN_BUTTON />
					</div>
		}
	});
module.exports = TOP_RIGHT_BAR;
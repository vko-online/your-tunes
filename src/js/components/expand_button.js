/*** @jsx React.DOM */
var React = require('react'),
ICON = require('./icon');


var style = {
	display: 'block'
};

var EXPAND_BUTTON = 
	React.createClass({
		render: function(){
			return <span title="toggle expand" style={style}>
						<ICON class="compress" />
					</span>
		}
	});
module.exports = EXPAND_BUTTON;
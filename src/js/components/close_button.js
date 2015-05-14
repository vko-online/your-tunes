/*** @jsx React.DOM */
var React = require('react'),
ICON = require('./icon');

var CLOSE_BUTTON = 
React.createClass({
	render: function(){
		return <span title="close">
					<ICON class="close" />
				</span>
	}
});
module.exports = CLOSE_BUTTON;
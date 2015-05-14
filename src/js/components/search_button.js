/*** @jsx React.DOM */
var React = require('react'),
ICON = require('./icon');

var SEARCH_BUTTON = 
React.createClass({
	render: function(){
		return <span title="close">
					<ICON class="search" />
				</span>
	}
});
module.exports = SEARCH_BUTTON;
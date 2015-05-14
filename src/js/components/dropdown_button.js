/*** @jsx React.DOM */
var React = require('react'),
ICON = require('./icon');

var DROPDOWN_BUTTON = 
	React.createClass({
		render: function(){
			return <span title="menu">
						<ICON class="caret-down"/>
					</span>
		}
	});
module.exports = DROPDOWN_BUTTON;
/*** @jsx React.DOM */
var React = require('react'),
PLAY_BUTTON = require('./play_button'),
NEXT_BUTTON = require('./next_button'),
PREV_BUTTON = require('./prev_button'),
ICON = require('./icon');

var CONTROL_BUTTONS = 
	React.createClass({
		render: function(){
			return <div>
						<PREV_BUTTON />
						<PLAY_BUTTON />
						<NEXT_BUTTON />
					</div>
		}
	});
module.exports = CONTROL_BUTTONS;
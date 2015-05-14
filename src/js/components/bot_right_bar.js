/*** @jsx React.DOM */
var React = require('react'),
PLAYLIST_BUTTON = require('./playlist_button'),
SEARCH_BUTTON = require('./search_button'),
VOLUME_TRACK = require('./volume_track'),
VOLUME_BUTTON = require('./volume_button');

var style = {
	display: 'inline',
	position: 'relative',
	float: 'right'
};

var BOT_RIGHT_BAR = 
	React.createClass({
		render: function(){
			return <div title="BOT_RIGHT_BAR" style={style}>
						<VOLUME_TRACK />
						<VOLUME_BUTTON />
						<SEARCH_BUTTON />
						<PLAYLIST_BUTTON />
					</div>
		}
	});
module.exports = BOT_RIGHT_BAR;
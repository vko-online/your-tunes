/*** @jsx React.DOM */
var React = require('react'),
TITLE_TRACK = require('./title_track');


var style = {
	display: 'inline-block',
	maxWidth: 140,
	overflow: 'hidden'
};

var TOP_MID_BAR = 
	React.createClass({
		render: function(){
			return <div title="TOP_MID_BAR" style={style}>
						<TITLE_TRACK />
					</div>
		}
	});
module.exports = TOP_MID_BAR;
/*** @jsx React.DOM */
var React = require('react'),
TuneActions = require('../actions/tune_actions'),
TuneStore = require('../stores/tune_store.js'),
ICON = require('./icon');

var style = {
	fontSize: 16
};

var get_next = function(){
	return { next_index: TuneStore.get_next()}
}


var NEXT_BUTTON = 
React.createClass({
	getInitialState: function(){
		return get_next();
	},
	handleClick: function(){
		TuneActions.next(this.state.next_index);
	},
	render: function(){
		return <span style={style} title="forward" onClick={this.handleClick}>
					<ICON class="forward" />
				</span>
	}
});
module.exports = NEXT_BUTTON;
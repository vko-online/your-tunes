/*** @jsx React.DOM */
var React = require('react'),
TuneActions = require('../actions/tune_actions'),
TuneStore = require('../stores/tune_store.js'),
ICON = require('./icon');


var style = {
	fontSize: 16
};


var get_prev = function(){
	return { prev_index: TuneStore.get_prev()}
}

var PREV_BUTTON = 
React.createClass({
	getInitialState: function(){
		return get_prev();
	},
	handleClick: function(){
		TuneActions.next(this.state.prev_index);
	},
	render: function(){
		return <span style={style} title="backward" onClick={this.handleClick}>
					<ICON class="backward" />
				</span>
	}
});
module.exports = PREV_BUTTON;
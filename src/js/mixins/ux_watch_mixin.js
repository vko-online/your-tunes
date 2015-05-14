var UxStore = require('../stores/ux_store');

var UxWatchMixin = function(callback){
	return {
		getInitialState: function(){
			return callback();
		},
		componentWillMount: function(){
			UxStore.addChangeListener(this._onChange);
		},
		componentWillUnmount: function(){
			UxStore.removeChangeListener(this._onChange)
		},
		_onChange: function(){	
			this.setState(callback());
		}
	}
}

module.exports = UxWatchMixin;
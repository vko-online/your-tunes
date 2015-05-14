var TuneStore = require('../stores/tune_store');

var TuneWatchMixin = function(callback){
	return {
		getInitialState: function(){
			return callback();
		},
		componentWillMount: function(){
			TuneStore.addChangeListener(this._onChange);
		},
		componentWillUnmount: function(){
			TuneStore.removeChangeListener(this._onChange)
		},
		_onChange: function(){	
			this.setState(callback());
		}
	}
}

module.exports = TuneWatchMixin;
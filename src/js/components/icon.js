/*** @jsx React.DOM */
var React = require('react');

var wrapperStyle = {
	padding: 5
};

var ICON = 
	React.createClass({
		render: function(){
			var is_active = function(v){
				if(!!v){
					return {
						color: 'blue'
					}
				}
			}
			return <span style={wrapperStyle}>
						<i className={'fa fa-' + this.props.class} style={is_active(this.props.active)}></i>
					</span>
		}
	});
module.exports = ICON;
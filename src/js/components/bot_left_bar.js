/*** @jsx React.DOM */
var React = require('react'),
    ICON = require('./icon');


var style = {
    display: 'inline-block',
    float: 'left'
};

var BOT_LEFT_BAR =
    React.createClass({
        render: function () {
            return <div title="BOT_LEFT_BAR" style={style}>
                <ICON class="info"/>
            </div>
        }
    });
module.exports = BOT_LEFT_BAR;
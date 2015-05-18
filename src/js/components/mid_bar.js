/*** @jsx React.DOM */
var React = require('react'),
    TuneActions = require('../actions/tune_actions'),
    TuneStore = require('../stores/tune_store');


var style = {
    position: 'absolute',
    top: 50,
    bottom: 50,
    left: 0,
    right: 0,
    overflow: 'auto'
};
var ul_style = {
    padding: '0 0 0 20'
};
var li_style = {
    listStyle: 'none',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    textDecoration: 'underline',
    cursor: 'pointer'
};

var MID_BAR =
    React.createClass({
        handleClick: function (e) {
            var int_index = parseInt(e.target.getAttribute('data-index'));
            TuneActions.activate_adapter(int_index);
        },
        render: function () {
            var adapters = TuneStore.get_adapters().map(function (adapter, index) {
                return <li key={index} data-index={adapter.code} style={li_style}>
                    {adapter.display_name}
                </li>
            });
            return <div style={style}>
                <ul style={ul_style} onClick={this.handleClick}>
                    select adapter
                    {adapters}
                </ul>
            </div>
        }
    });
module.exports = MID_BAR;
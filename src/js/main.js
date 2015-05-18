/*** @jsx React.DOM */
var APP = require('./components/app'),
    React = require('react');


//require adapter (redundant)
require('./adapters/local');
require('./adapters/vk');

React.render(
    <APP />,
    document.getElementById('main'));
/*** @jsx React.DOM */
var React = require('react'),
    PLAYLIST = require('./playlist'),
    ICON = require('./icon'),
    UxActions = require('../actions/ux_actions'),
    UxStore = require('../stores/ux_store'),
    UxWatchMixin = require('../mixins/ux_watch_mixin');


var active_style = {
    display: 'block',
    background: '#eee',
    maxHeight: 500,
    overflow: 'hidden',
    transition: '2s ease',
    fontWeight: 200,
    fontFamily: 'Helvetica Neue'
};
var inactive_style = {
    display: 'block',
    background: '#eee',
    maxHeight: 0,
    overflow: 'hidden',
    transition: '.5s ease',
    fontWeight: 200,
    fontFamily: 'Helvetica Neue'
};
var history_button = {
    float: 'right'
}
var type_style = {
    fontSize: 16,
}
var owner_style = {
    fontSize: 16,
    color: '#aaa'
}
var wrapper_style = {
    padding: '15px 0 10px 4px'
}

function get_playlist_state() {
    return {
        playlist_visible: UxStore.playlist_visible()
    }
}
var PLAYLIST_CONTAINER =
    React.createClass({
        mixins: [UxWatchMixin(get_playlist_state)],
        render: function () {
            return <div style={this.state.playlist_visible ? active_style : inactive_style}>
                <div style={wrapper_style}>
                    <label style={type_style}>Up Next</label>
                    <label style={owner_style}> from Judie Allen</label>
				<span style={history_button}>
					<ICON class="clock-o"/>
				</span>
                </div>
                <hr />
                <PLAYLIST />
            </div>
        }
    });
module.exports = PLAYLIST_CONTAINER;
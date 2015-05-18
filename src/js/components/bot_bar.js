/*** @jsx React.DOM */
var React = require('react'),
    UxStore = require('../stores/ux_store'),
    UxWatchMixin = require('../mixins/ux_watch_mixin'),
    TIME_TRACK = require('./time_track'),
    BOT_LEFT_BAR = require('./bot_left_bar'),
    BOT_MID_BAR = require('./bot_mid_bar'),
    BOT_RIGHT_BAR = require('./bot_right_bar');


var style = {
    background: 'rgb(198, 198, 198)',
    position: 'absolute',
    bottom: 0,
    opacity: 1,
    zIndex: 11,
    left: 0,
    right: 0,
    height: 50
};
var style2 = {
    background: 'rgb(198, 198, 198)',
    position: 'absolute',
    bottom: 0,
    opacity: 0,
    zIndex: 11,
    left: 0,
    transition: '1s ease',
    right: 0,
    height: 50
};

function state_watcher() {
    return {
        control_visible: UxStore.ux_controls_visible(),
        is_expanded: UxStore.is_expanded()
    }
}
var TOP_BAR =
    React.createClass({
        mixins: [UxWatchMixin(state_watcher)],
        render: function () {
            return <div style={ (this.state.control_visible && this.state.is_expanded) ? style : style2}>
                <BOT_LEFT_BAR />
                <BOT_MID_BAR />
                <BOT_RIGHT_BAR />
                <TIME_TRACK />
            </div>
        }
    });
module.exports = TOP_BAR;
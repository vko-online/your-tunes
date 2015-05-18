/*** @jsx React.DOM */
var React = require('react'),

    UxWatchMixin = require('../mixins/ux_watch_mixin'),
    UxStore = require('../stores/ux_store'),
    UxActions = require('../actions/ux_actions'),
    TuneStore = require('../stores/tune_store'),
    TuneWatchMixin = require('../mixins/tune_watch_mixin'),
    PLAYLIST_CONTAINER = require('./playlist_container'),
    TOP_BAR = require('./top_bar'),
    MID_BAR = require('./mid_bar'),
    BOT_BAR = require('./bot_bar');

var inset_style = {
    fontSize: 14,
    width: 200,
    height: 200,
    backgroundSize: 'auto 100%',
    backgroundImage: "url('../assets/song-image.jpg')",
    position: 'relative',
};
var outset_style = {
    position: 'absolute',
    display: 'inline-block',
    overflow: 'hidden',
    height: 'auto',
    color: 'rgb(62, 62, 62)',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    border: '1px solid #aaa',
    borderRadius: 6,
    boxShadow: '3px 3px 30px #bbb'
};

var timeout;
var _mouse_down = false;
var startX = 0, startY = 0, x = 0, y = 0;
function _mouseDown(event) {
    if (event.target.className == 'js-drag') {
        console.log(event.target);
        _mouse_down = true;
        startX = event.pageX - x;
        startY = event.pageY - y;
    }

}
function _mouseMove(event) {
    if (_mouse_down && !UxStore.volume_visible()) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        UxActions.set_position(x, y);
    }
}
function _mouseUp(event) {
    _mouse_down = false;
}

function _mouseEnter() {
    UxActions.show_controls();
}
function _mouseLeave() {
    UxActions.hide_controls();
    // if(timeout){
    // 	clearTimeout(timeout);
    // 	timeout = null;
    // }
    // timeout = setTimeout(function() {
    // 	UxActions.hide_controls();
    // 	clearTimeout(timeout);
    // 	timeout = null;
    // }.bind(this), 1000);
}
function _aspect_value_setter(obj, value1, value2) {
    obj.height = value1;
    obj.width = value2;
    return obj;
}
function _position_setter(obj, _x, _y) {
    obj.left = _x;
    obj.top = _y;
    return obj;
}

function _state_watcher() {
    return {
        aspect_value: UxStore.get_aspect_value(),
        position_x: UxStore.get_position().x,
        position_y: UxStore.get_position().y,
        is_expanded: UxStore.is_expanded()
    }
}

function _adapter_watcher(){
    return {
        is_adapter_selected: TuneStore.is_adapter_selected()
    }
}
var APP =
    React.createClass({
        mixins: [UxWatchMixin(_state_watcher)],

        render: function () {

            var _adapter = !TuneStore.is_adapter_selected() ? <MID_BAR /> : undefined;

            return <div className="js-drag"
                        style={_position_setter(outset_style, this.state.position_x, this.state.position_y)}
                        onMouseDown={_mouseDown}
                        onMouseMove={_mouseMove}
                        onMouseUp={_mouseUp}
                        onMouseEnter={_mouseEnter}
                        onMouseLeave={_mouseLeave}>
                <div className="js-drag"
                     style={this.state.is_expanded ? _aspect_value_setter(inset_style, this.state.aspect_value, this.state.aspect_value): _aspect_value_setter(inset_style, 50, this.state.aspect_value)}>
                    <TOP_BAR />
                    {_adapter}
                    <BOT_BAR />
                </div>
                <PLAYLIST_CONTAINER />
            </div>
        }
    });
module.exports = APP;
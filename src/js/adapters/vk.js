/**
 * Created by bwin on 5/17/15.
 */
var Promise = require('es6-promise'),
    TuneActions = require('../actions/tune_actions');

//this adapter must go do request to <server></server>


var VK = {
    get_tracks: function(){
        return [

        ];
    },
    keys: {
        track_identification_key : 'id',
        track_artist_key : 'artist',
        track_album_key: 'album',
        track_title_key: 'title',
        track_image_key: false,
        track_source_key: 'src'
    },
    display_name: 'VK music',
    code: 111
    //if false, track images will be pulled from another track-images service
};

TuneActions.register_adapter(VK);
module.exports = VK;


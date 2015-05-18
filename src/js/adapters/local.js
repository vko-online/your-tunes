/**
 * Created by bwin on 5/17/15.
 */
var Promise = require('es6-promise'),
    TuneActions = require('../actions/tune_actions');

//this supposed to be written with promises
var tracks =  [
    {
        id: 1,
        artist: 'Баста',
        album: 'Баста 4',
        title: '01 Интро',
        src: '../assets/tracks/01%20%D0%98%D0%BD%D1%82%D1%80%D0%BE.mp3'
    }, {
        id: 2,
        artist: 'Баста',
        album: 'Баста 4',
        title: '02 Это Дороже Денег',
        src: '../assets/tracks/02%20%D0%AD%D1%82%D0%BE%20%D0%94%D0%BE%D1%80%D0%BE%D0%B6%D0%B5%20%D0%94%D0%B5%D0%BD%D0%B5%D0%B3.mp3'
    }, {
        id: 3,
        artist: 'Баста',
        album: 'Баста 4',
        title: '03 Мама',
        src: '../assets/tracks/03%20%D0%9C%D0%B0%D0%BC%D0%B0.mp3'
    }
];
var LOCAL = {
    get_tracks: function(){
        return tracks;
    },
    get_track_by_id: function(id){
        if(id){
            var filtered = tracks.filter(function(track){
                return track.id == id;
            });
            return filtered[0];
        } else {
            return tracks[0];
        }
    },
    keys: {
        track_identification_key : 'id',
        track_artist_key : 'artist',
        track_album_key: 'album',
        track_title_key: 'title',
        track_source_key: 'src',
        track_image_key: false
        //if false, track images will be pulled from another track-images service
    },
    display_name: 'Local music (for dev only)',
    code: 123

};

TuneActions.register_adapter(LOCAL);
module.exports = LOCAL;


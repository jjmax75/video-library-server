const mongoose = require( 'mongoose' );
const VideoModel = require( './../models/video.model' );

// get all videos
const getVideos = ( req, res ) => {
  VideoModel.find( ( err, video ) => {
    if( err ) res.send( err );
    res.json( video );
  });
};

// get single video
const getVideo = ( req, res ) => {
  VideoModel.findOne( { 'video_id': req.params.video_id }, ( err, video ) => {
    if ( err ) res.send( err );
    res.json( video );
  });
};

// update last watched time of single video
const updateVideoLastWatched = ( req, res ) => {
  Video.findOne( { 'video_id': req.params.video_id }, ( err, video ) => {
    if ( err ) res.send( err );
    video.last_watched = Date.now();

    video.save( ( err ) => {
      if (err) res.send(err);

      res.json({ message: 'Video updated!' });
    });
  })
};

module.exports = { getVideos, getVideo, updateVideoLastWatched };

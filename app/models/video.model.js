const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  'video': { type: String },
  'video-href': { type: String },
  'video_id': { type: String },
  'title': { type: String },
  'description': { type: String },
  'tags': { type: String },
  'pagination-href': { type: String },
  'last_watched': { type: Date }
});

const VideoModel = mongoose.model( 'Video', VideoSchema );

module.exports = VideoModel;

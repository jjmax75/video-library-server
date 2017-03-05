const express = require( 'express' );
const router = express.Router();
const mongoose = require( 'mongoose' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const app = express();

// Environment
require('dotenv').config()
const port = process.env.PORT || 8080;

// Routes
const VideoRoutes = require( './app/router/video.routes' );

// DB
mongoose.connect( process.env.DB_URI );
const VideoModel = require( './app/models/video.model' );

// Modules
app.use( morgan( 'dev' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( bodyParser.text() );
app.use( bodyParser.json( { type: 'application/json' } ) );

router.use( ( req, res, next ) => {
  console.log( 'request being processed' );
  next()
});

router.get( '/', (req, res) => {
  res.json( { message: 'API is up and running' } );
});

router.route( '/videos' )
  .get( VideoRoutes.getVideos );

router.route( '/videos/:video_id' )
  .get( VideoRoutes.getVideo )
  .put( VideoRoutes.updateVideoLastWatched );

app.use( '/api', router );

app.listen( port );

console.log( 'App is listening on port', port );

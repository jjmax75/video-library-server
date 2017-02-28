const express = require( 'express' );
const mongoose = require( 'mongoose' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const app = express();

require('dotenv').config()

app.use( morgan( 'dev' ) ); // log every request to the console
app.use( bodyParser.urlencoded( { extended: true } ) ); // parse application/x-www-form-urlencoded
app.use( bodyParser.json() ); // parse application/json

const port = process.env.PORT || 8080;
mongoose.connect( process.env.DB_URI );
const Video = require( './app/models/video.model' );

const router = express.Router();

router.use( ( req, res, next ) => {
  console.log( 'request being processed' );
  next()
});

router.get( '/', (req, res) => {
  res.json( { message: 'API is up and running' } );
});

router.route( '/videos' )
  .get( ( req, res ) => {
    Video.find( ( err, video ) => {
      if( err ) res.send( err );
      res.json( video );
    });
  });

router.route( '/videos/:video_id' )
  .get( ( req, res ) => {
    Video.findOne( { 'video_id': req.params.video_id }, ( err, video ) => {
      if ( err ) res.send( err );
      res.json( video );
    });
  })
  .put( ( req, res ) => {
    Video.findOne( { 'video_id': req.params.video_id }, ( err, video ) => {
      if ( err ) res.send( err );
      video.last_watched = Date.now();

      video.save( ( err ) => {
        if (err) res.send(err);

        res.json({ message: 'Video updated!' });
      });
    })
  });

app.use( '/api', router );

app.listen( port );

console.log( 'App is listening on port', port );

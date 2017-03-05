process.env.NODE_ENV = 'test';

const mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;
const VideoModel = require( './../app/models/video.model' );

const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const server = require( './../server' );
const should = chai.should();

chai.use( chaiHttp );

describe( 'Videos', () => {
  before( done => {
    VideoModel.remove({}, err => {
    });
    const testVideo = new VideoModel({
      "description": "Video Description",
      "last_watched": "",
      "pagination-href": "pagination-href",
      "tags": "test, video",
      "title": "Video Title",
      "video": "Test Video",
      "video-href": "video-href",
      "video_id": "12345678"
    });
    testVideo.save();
    done();
  });

  // test Get all videos
  describe( '/GET videos', () => {
    it( 'should GET all the videos', done => {
      chai.request( server )
        .get( '/api/videos' )
        .end( (err, res) => {
          res.should.have.status( 200 );
          res.body.should.be.a( 'array' );
          res.body.length.should.be.eql( 1 );
          done();
        });
    });
  });

  // test Get a video
  describe( '/GET video', () => {

    it( 'should GET a video', done => {

      // setup a test video
      const testVideo = new VideoModel({
        "description": "Video Description",
        "last_watched": "",
        "pagination-href": "pagination-href",
        "tags": "test, video",
        "title": "Video Title",
        "video": "Test Video",
        "video-href": "video-href",
        "video_id": "12345678"
      });
      testVideo.save( ( err, video ) => {
        chai.request( server )
          .get( '/api/videos/12345678' )
          .end( (err, res) => {
            res.should.have.status( 200 );
            res.body.should.be.a( 'object' );
            done();
          });
      });
    });
  });
});

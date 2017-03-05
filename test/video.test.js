process.env.NODE_ENV = 'test';

const mongoose = require( 'mongoose' );
const VideoModel = require( './../app/models/video.model' );

const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const server = require( './../server' );
const should = chai.should();

chai.use( chaiHttp );

describe( 'Videos', () => {
  beforeEach( done => {
    VideoModel.remove({}, err => {
      done();
    });
  });

  // test Get all videos
  describe( '/GET videos', () => {
    it( 'should GET all the videos', done => {
      chai.request( server )
        .get( '/api/videos' )
        .end( (err, res) => {
          res.should.have.status( 200 );
          res.body.should.be.a( 'array' );
          res.body.length.should.be.eql( 0 );
          done();
        });
    });
  });
});

const sinon = require( 'sinon' );
const chai = require( 'chai' );
const expect = chai.expect;
const path = require( 'path' );

const mongoose = require( 'mongoose' );
require( 'sinon-mongoose' );

//Importing our video model for our unit testing.
const Video = require( path.join( __dirname, '../../../app/models/video.model' ));


/**
* GET Tests
*/
describe( "Get all videos", () => {
  // Test will pass if we get all videos
  it( "should return all videos", (done) => {
    const VideoDBMock = sinon.mock(Video);
    const expectedResult = {};
    VideoDBMock.expects( 'find' ).yields( null, expectedResult );
    Video.find( ( err, result ) => {
      VideoDBMock.verify();
      VideoDBMock.restore();
      expect( result.status ).to.be.true;
      done();
    });
  });

  // Test will pass if we fail to get a video
  it( "should return error", ( done ) => {
    const VideoDBMock = sinon.mock( Video );
    const expectedResult = {};
    VideoDBMock.expects( 'find' ).yields( expectedResult, null );
    Video.find( ( err, result ) => {
      VideoDBMock.verify();
      VideoDBMock.restore();
      expect( err.status ).to.not.be.true;
      done();
    });
  });
});
/**
* end GET tests
*/


/**
* UPDATE Tests
*/
describe( "Update a video by id", () => {
  it( "should updated a video by id", (done) => {
    const VideoDBMock = sinon.mock( new Video( { viewed: true } ));
    const video = VideoDBMock.object;
    const expectedResult = {};
    VideoDBMock.expects( 'save' ).withArgs( { _id: 12345 } ).yields( null, expectedResult );
    video.save( ( err, result ) => {
      VideoDBMock.verify();
      VideoDBMock.restore();
      expect( result.status ).to.be.true;
      done();
    });
  });

  // Test will pass if the video is not updated based on an ID
  it( "should return error if update action fails", (done) => {
    const VideoDBMock = sinon.mock( new Video( { viewed: true } ));
    const video = VideoDBMock.object;
    const expectedResult = {};
    VideoDBMock.expects( 'save' ).withArgs( { _id: 12345 } ).yields( expectedResult, null );
    video.save( ( err, result ) => {
      VideoDBMock.verify();
      VideoDBMock.restore();
      expect( err.status ).to.not.be.true;
      done();
    });
  });
});
/**
* end UPDATE tests
*/

const config = {
  port: process.env.PORT || 3001,
  db: process.env.DB_URI || 'mongodb://localhost/video-library',
  test_port: 3002,
  test_db: 'mongodb://localhost/video-library_test'
}

module.exports = config;

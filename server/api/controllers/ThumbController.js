/**
 * ThumbController.js - controls file uploads
 */

var path = require('path');

var allowedTypes = ['image/gif', 'image/jpeg','image/png','image/svg+xml'];
var allowedExts  = ['.gif', '.jpg', '.jpeg', '.png', '.svg'];

module.exports = {

  upload: function(req, res) {

    // File validation
    try {
      var file = req.file('thumb')._files[0].stream;
      var type = file.headers['content-type'];
      var ext = path.extname(file.filename);

      if (allowedTypes.indexOf(type) < 0) throw new Error("Invalid file type: "+type);
      if (allowedExts.indexOf(ext) < 0) throw new Error("Invalid file ext: "+ext);

    } catch (e) {
      return res.badRequest(e.message);
    }

    // File upload
    req.file('thumb').upload({
      dirname: sails.config.upload_thumbs_dir,
      maxBytes: sails.config.upload_thumbs_limit
    },function (err, uploadedFiles) {
      if (err) return res.negotiate(err);

      return res.send(sails.config.upload_thumbs_url+path.basename(uploadedFiles[0].fd));
    });
  }
};
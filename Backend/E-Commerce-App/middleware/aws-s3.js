
const multer = require("multer");
const shortid = require("shortid");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");



const s3 = new aws.S3({
    accessKeyId: "",
    secretAccessKey:"",
    
  });
  exports.uploadS3 =multer({
    storage: multerS3({
      s3: s3,
      bucket: "ebucketghana",
      acl: "public-read",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
      },
    }),
  });
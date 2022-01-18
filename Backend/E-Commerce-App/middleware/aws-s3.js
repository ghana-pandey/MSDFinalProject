
const multer = require("multer");
const shortid = require("shortid");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");



const s3 = new aws.S3({
    accessKeyId: "AKIAQIAHQ3CDFJOO2RWD",
    secretAccessKey:"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",
    
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
"use strict";
const AWS = require("aws-sdk");

module.exports.requestUploadURL = async (event) => {
  const s3 = new AWS.S3();
  const params = JSON.parse(event.body);

  const s3Params = {
    Bucket: "leaver-app-uploads",
    Key: params.name,
    ContentType: params.type,
    ACL: "public-read",
  };

  let uploadURL = s3.getSignedUrl("putObject", s3Params);

  return new Promise((resolve, reject) => {
    resolve({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ uploadURL: uploadURL }),
    });
  });
};

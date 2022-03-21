// import request from './cloudRequest/request'
// 新建页面时 默认引入
const app = getApp()
// 初始化一个的request() 实例
const request = app.cloudRequest()
const bucket = 'paradise-1256237186'
const region = 'ap-nanjing'
const COS = require('../lib/cos-wx-sdk-v5')
var cos = new COS({
  // 必选参数
  getAuthorization: function (options, callback) {
    // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
    // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
    // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
    request.getRequest('/mp/minio/credential').then(res => {
      var data = res.data
      var credentials = data && data.credentials
      if (!data || !credentials) return console.error('credentials invalid')
      let obj = {
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
        ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
      };
      console.log(obj)
      callback(obj)
    })
  }
})

export function upload(fileObject, key, callback, statusCallback) {
  cos.putObject({
    Bucket: bucket,
    /* 必须 */
    Region: region,
    /* 存储桶所在地域，必须字段 */
    Key: key,
    /* 必须 */
    StorageClass: 'STANDARD',
    Body: fileObject, // 上传文件对象
    onProgress: function (progressData) {
      console.log(JSON.stringify(progressData))
      statusCallback(progressData)
    }
  }, function (err, data) {
    console.log(err || data)
    if (data) {
      callback(data.Location)
    }
  })
}

export function uploadByPath(filePath, key, callback, statusCallback) {
  cos.postObject({
    Bucket: bucket,
    /* 必须 */
    Region: region,
    /* 存储桶所在地域，必须字段 */
    Key: key,
    /* 必须 */
    StorageClass: 'STANDARD',
    FilePath: filePath,
    // Body: fileObject, // 上传文件对象
    onProgress: function (progressData) {
      console.log(JSON.stringify(progressData))
      statusCallback(progressData)
    }
  }, function (err, data) {
    if (err) {
      console.log(err)
    }
    console.log(err || data)
    if (data) {
      callback(data.Location)
    }
  })
}

export function getUrl(key) {
  cos.getObject({
    Bucket: bucket,
    /* 必须 */
    Region: region,
    /* 存储桶所在地域，必须字段 */
    Key: key /* 必须 */
  }, function (err, data) {
    console.log(err || data.Body)
    return data.body
  })
}

export function deleteFile(key) {
  cos.deleteObject({
    Bucket: bucket,
    /* 必须 */
    Region: region,
    /* 存储桶所在地域，必须字段 */
    Key: key /* 必须 */
  }, function (err, data) {
    console.log(err || data)
  })
}

export function test() {
  cos.headBucket({
    Bucket: bucket,
    /* 必须 */
    Region: region,
    /* 必须 */
  }, function (err, data) {
    if (err) {
      console.log(err.statusCode)
      console.log(err.headers)
    }
    console.log(err || data);
  });
}
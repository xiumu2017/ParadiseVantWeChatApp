const app = getApp()
// 初始化一个的request() 实例
const request = app.cloudRequest()

var CosAuth = require('../lib/cos-auth');
var config = require('./config');

var uploadFile = function (filePath, callback, statusCallback) {
    // 请求用到的参数
    // var prefix = 'https://cos.' + config.Region + '.myqcloud.com/' + config.Bucket + '/'; // 这个是后缀式，签名也要指定 Pathname: '/' + config.Bucket + '/'
    var prefix = 'https://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com/';

    // 对更多字符编码的 url encode 格式
    var camSafeUrlEncode = function (str) {
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A');
    };

    // 获取临时密钥
    var stsCache;
    var getCredentials = function (callback) {
        if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
            callback(stsCache.credentials);
            return;
        }
        request.getRequest('/mp/minio/credential').then(res => {
            var data = res.data
            var credentials = data && data.credentials
            if (!data || !credentials) return console.error('credentials invalid')
            stsCache = data
            let obj = {
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                SecurityToken: credentials.sessionToken,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
            };
            console.log(obj)
            callback(stsCache && stsCache.credentials);
        })

        // wx.request({
        //     method: 'GET',
        //     url: config.stsUrl, // 服务端签名，参考 server 目录下的两个签名例子
        //     dataType: 'json',
        //     success: function (result) {
        //         var data = result.data;
        //         var credentials = data.credentials;
        //         if (credentials) {
        //             stsCache = data
        //         } else {
        //             wx.showModal({title: '临时密钥获取失败', content: JSON.stringify(data), showCancel: false});
        //         }
        //         callback(stsCache && stsCache.credentials);
        //     },
        //     error: function (err) {
        //         wx.showModal({title: '临时密钥获取失败', content: JSON.stringify(err), showCancel: false});
        //     }
        // });
    };

    // 计算签名
    var getAuthorization = function (options, callback) {
        getCredentials(function (credentials) {
            callback({
                XCosSecurityToken: credentials.sessionToken,
                Authorization: CosAuth({
                    SecretId: credentials.tmpSecretId,
                    SecretKey: credentials.tmpSecretKey,
                    Method: options.Method,
                    Pathname: options.Pathname,
                })
            });
        });
    };

    // 上传文件
    var uploadFile = function (filePath, callback, statusCallback) {
        var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
        getAuthorization({
            Method: 'POST',
            Pathname: '/'
        }, function (AuthData) {
            var requestTask = wx.uploadFile({
                url: prefix,
                name: 'file',
                filePath: filePath,
                formData: {
                    'key': Key,
                    'success_action_status': 200,
                    'Signature': AuthData.Authorization,
                    'x-cos-security-token': AuthData.XCosSecurityToken,
                    'Content-Type': '',
                },
                success: function (res) {
                    var url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/');
                    if (res.statusCode === 200) {
                        wx.showModal({
                            title: '上传成功',
                            content: url,
                            showCancel: false
                        });
                        callback(url)
                    } else {
                        wx.showModal({
                            title: '上传失败',
                            content: JSON.stringify(res),
                            showCancel: false
                        });
                    }
                    console.log(res.statusCode);
                    console.log(url);
                },
                fail: function (res) {
                    wx.showModal({
                        title: '上传失败',
                        content: JSON.stringify(res),
                        showCancel: false
                    });
                }
            });
            requestTask.onProgressUpdate(function (res) {
                console.log('正在进度:', res);
                statusCallback(res);
            });
        });
    };

    // 简单上传
    uploadFile(filePath, callback, statusCallback);

    // 选择文件
    // wx.chooseImage({
    //     count: 1, // 默认9
    //     sizeType: ['original'], // 可以指定是原图还是压缩图，这里默认用原图
    //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //     success: function (res) {
    //         uploadFile(res.tempFiles[0].path);
    //     }
    // })
};

module.exports = uploadFile;
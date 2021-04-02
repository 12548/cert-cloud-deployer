"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const ssl = __importStar(require("tencentcloud-sdk-nodejs/tencentcloud/services/ssl/v20191205"));
const SslClient = ssl.v20191205.Client;
const clientConfig = {
    credential: {
        secretId: 'AKIDb8azGT6hkgUGvmQHsKhxBOWXchSAQ2lK',
        secretKey: 'Yv897NYYM1VntoX4veCYt8C6oLi7OUVP',
    },
    region: '',
    profile: {
        httpProfile: {
            endpoint: 'ssl.tencentcloudapi.com',
        },
    },
};
function createSSLClient(secretId, secretKey) {
    return new SslClient(Object.assign(clientConfig, {
        credential: {
            secretId,
            secretKey,
        },
    }));
}
exports.default = createSSLClient;
// const cert = fs.readFileSync('./certs/newgmud.cn/fullchain.pem', { encoding: 'utf-8' })
// const key = fs.readFileSync('./certs/newgmud.cn/privkey.pem', { encoding: 'utf-8' })
// const params = {
//     CertificatePublicKey: cert,
//     CertificatePrivateKey: key,
//     Alias: 'testUploadCert',
// }
// SSLClient.UploadCertificate(params).then(
//     (data) => {
//         console.log(data)
//     },
//     (err) => {
//         console.error('error', err)
//     },
// )
// 获取证书列表
// const params = {}
// client.DescribeCertificates(params).then(
//     (data) => {
//         console.log(data)
//     },
//     (err) => {
//         console.error('error', err)
//     },
// )
//# sourceMappingURL=sslClient.js.map
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
const clb = __importStar(require("tencentcloud-sdk-nodejs/tencentcloud/services/clb/v20180317"));
const ClbClient = clb.v20180317.Client;
const clientConfig = {
    credential: {
        secretId: 'AKIDb8azGT6hkgUGvmQHsKhxBOWXchSAQ2lK',
        secretKey: 'Yv897NYYM1VntoX4veCYt8C6oLi7OUVP',
    },
    region: 'ap-guangzhou',
    profile: {
        httpProfile: {
            endpoint: 'clb.tencentcloudapi.com',
        },
    },
};
function createCLBClient(secretId, secretKey) {
    return new ClbClient(Object.assign(clientConfig, {
        credential: {
            secretId,
            secretKey,
        },
    }));
}
exports.default = createCLBClient;
// const params = {
//     OldCertificateId: 'jPpit46W',
//     Certificate: {
//         CertId: 'lZa7wfwP',
//     },
// }
// client.ReplaceCertForLoadBalancers(params).then(
//     (data) => {
//         console.log(data)
//     },
//     (err) => {
//         console.error('error', err)
//     },
// )
//# sourceMappingURL=clbClient.js.map
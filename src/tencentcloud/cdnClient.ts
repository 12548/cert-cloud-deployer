// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
import * as cdn from 'tencentcloud-sdk-nodejs/tencentcloud/services/cdn/v20180606'

const CdnClient = cdn.v20180606.Client

const clientConfig = {
    credential: {
        secretId: 'AKIDb8azGT6hkgUGvmQHsKhxBOWXchSAQ2lK',
        secretKey: 'Yv897NYYM1VntoX4veCYt8C6oLi7OUVP',
    },
    region: '',
    profile: {
        httpProfile: {
            endpoint: 'cdn.tencentcloudapi.com',
        },
    },
}

export default function createCDNClient(secretId: string, secretKey: string) {
    return new CdnClient(
        Object.assign(clientConfig, {
            credential: {
                secretId,
                secretKey,
            },
        }),
    )
}

// const params = {
//     "Domain": "center.newgmud.cn",
//     "Https": {
//         "Switch": "on",
//         "Http2": "off",
//         "OcspStapling": "off",
//         "VerifyClient": "off",
//         "CertInfo": {
//             "CertId": "lZa7wfwP"
//         },
//         "Spdy": "off",
//         "SslStatus": "deployed",
//         "Hsts": {
//             "Switch": "off",
//             "MaxAge": 0,
//             "IncludeSubDomains": "off"
//         },
//         "TlsVersion": [
//             "TLSv1",
//             "TLSv1.1",
//             "TLSv1.2"
//         ]
//     }
// };
// client.UpdateDomainConfig(params).then(
//     (data) => {
//         console.log(data);
//     },
//     (err) => {
//         console.error("error", err);
//     }
// );

// const params = {
//     "Filters": [
//         {
//             "Name": "domain",
//             "Value": [
//                 "*.newgmud.cn"
//             ],
//             "Fuzzy": true
//         }
//     ]
// };
// client.DescribeDomainsConfig(params).then(
//     (data) => {
//         console.log(data);
//     },
//     (err) => {
//         console.error("error", err);
//     }
// );

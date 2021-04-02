// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
import * as clb from 'tencentcloud-sdk-nodejs/tencentcloud/services/clb/v20180317'

const ClbClient = clb.v20180317.Client

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
}

export default function createCLBClient(secretId: string, secretKey: string) {
    return new ClbClient(
        Object.assign(clientConfig, {
            credential: {
                secretId,
                secretKey,
            },
        }),
    )
}

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

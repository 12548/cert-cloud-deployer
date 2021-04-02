// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
import * as ssl from 'tencentcloud-sdk-nodejs/tencentcloud/services/ssl/v20191205'

const SslClient = ssl.v20191205.Client

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
}

export default function createSSLClient(secretId: string, secretKey: string) {
    return new SslClient(
        Object.assign(clientConfig, {
            credential: {
                secretId,
                secretKey,
            },
        }),
    )
}

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

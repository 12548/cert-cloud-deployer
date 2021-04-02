#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
const util = __importStar(require("util"));
const sslClient_1 = __importDefault(require("./src/tencentcloud/sslClient"));
const cdnClient_1 = __importDefault(require("./src/tencentcloud/cdnClient"));
const clbClient_1 = __importDefault(require("./src/tencentcloud/clbClient"));
const path = __importStar(require("path"));
const moment_1 = __importDefault(require("moment"));
const Core = require("@alicloud/pop-core");
const [, , configPath] = process.argv;
const file = fs_1.default.readFileSync(configPath, 'utf8');
const config = yaml_1.default.parse(file);
void (async () => {
    for (const cert of config.certs) {
        console.log('正在处理证书' + cert.domain);
        const certStr = fs_1.default.readFileSync(path.join(cert.dir, '/fullchain.pem'), {
            encoding: 'utf-8',
        });
        const keyStr = fs_1.default.readFileSync(path.join(cert.dir, '/privkey.pem'), { encoding: 'utf-8' });
        if (config.qcloud) {
            console.log('Qcloud config is: ' + util.inspect(config.qcloud));
            const { secretId, secretKey } = config.qcloud;
            const sslClient = sslClient_1.default(secretId, secretKey);
            const cdnClient = cdnClient_1.default(secretId, secretKey);
            const clbClient = clbClient_1.default(secretId, secretKey);
            console.log('正在上传腾讯云');
            const oldCerts = (await sslClient.DescribeCertificates({})).Certificates.filter((it) => it.Domain === cert.domain);
            const alias = `${cert.domain}_${moment_1.default().format('YYYYMMDDHHmm')}`;
            const newCertId = (await sslClient.UploadCertificate({
                CertificatePublicKey: certStr,
                CertificatePrivateKey: keyStr,
                Alias: alias,
            })).CertificateId;
            console.log(`new cert uploaded as ${newCertId}(${alias})`);
            for (const oldCert of oldCerts) {
                console.log(`replacing LB Cert from ${oldCert.Alias}`);
                await clbClient.ReplaceCertForLoadBalancers({
                    OldCertificateId: oldCert.CertificateId,
                    Certificate: {
                        CertId: newCertId,
                    },
                });
            }
            const qcdnDomains = (await cdnClient.DescribeDomainsConfig({
                Filters: [
                    {
                        Name: 'domain',
                        Value: [cert.domain],
                        Fuzzy: true,
                    },
                ],
            })).Domains;
            for (const cdnDomain of qcdnDomains) {
                console.log(`replacing CDN Cert for ${cdnDomain.Domain}`);
                cdnDomain.Https.CertInfo = { CertId: newCertId };
                await cdnClient.UpdateDomainConfig({
                    Domain: cdnDomain.Domain,
                    Https: cdnDomain.Https,
                });
            }
            for (const oldCert of oldCerts) {
                console.log(`Deleting old cert ${oldCert.Alias}`);
                await sslClient.DeleteCertificate({ CertificateId: oldCert.CertificateId });
            }
        }
        if (config.aliyun) {
            const { accessKeyId, accessKeySecret } = config.aliyun;
            const clientCas = new Core({
                accessKeyId,
                accessKeySecret,
                endpoint: 'https://cas.aliyuncs.com',
                apiVersion: '2018-07-13',
            });
            const clientCdn = new Core({
                accessKeyId,
                accessKeySecret,
                endpoint: 'http://cdn.aliyuncs.com',
                apiVersion: '2018-05-10',
            });
            const aliyunParam = {
                timeout: 30000,
                method: 'POST',
            };
            console.log('正在上传阿里云');
            // 阿里云的名称不能重复，最长50个字符
            const name = `${cert.domain}_${moment_1.default().format('YYYYMMDDHHmm')}`.substring(0, 49);
            await clientCas.request('CreateUserCertificate', {
                name,
                Cert: certStr,
                Key: keyStr,
            }, aliyunParam);
            // 获取其他
            const aliCerts = (await clientCas.request('DescribeUserCertificateList', {
                ShowSize: 100,
                CurrentPage: 1,
            }, aliyunParam)).CertificateList;
            const myCommon = aliCerts.find((it) => it.name === name).common;
            const alicdnDomains = (await clientCdn.request('DescribeCdnHttpsDomainList', {}, aliyunParam)).CertInfos.CertInfo.filter((it) => it.CertCommonName === myCommon);
            for (const cdnDomain of alicdnDomains) {
                console.log('正在替换cdn域名： ' + cdnDomain.DomainName);
                await clientCdn.request('SetDomainServerCertificate', {
                    DomainName: cdnDomain.DomainName,
                    ServerCertificateStatus: 'on',
                    CertName: name,
                    ForceSet: '1',
                }, aliyunParam);
            }
            const aliOldCerts = aliCerts.filter((it) => it.name !== name && it.common === myCommon);
            for (const oldCert of aliOldCerts) {
                console.log(`正在删除旧证书：${oldCert.name}`);
                await clientCas.request('DeleteUserCertificate', { CertId: oldCert.id }, aliyunParam);
            }
        }
    }
})();
//# sourceMappingURL=index.js.map
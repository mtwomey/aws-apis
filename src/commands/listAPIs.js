'use strict';

const tcommands = require('tcommands');
const fs = require('fs');
const ini = require('ini');
const aws = require('../../lib/awsV3');

const command = {
    name: 'listApis',
    syntax: [
        '--list-apis',
        '-lapis'
    ],
    helpText: 'List the configured REST APIs',
    handler: handler,
}

tcommands.register(command);


async function handler() {
    console.log(JSON.stringify(await aws.getRestApis(), null, 2));
    // console.log(JSON.stringify(await aws.getAuthorizers(), null, 2));
}

// async function getAwsRestAPIs() {
//     const restApiInfo = {};

//     const client = new APIGatewayClient();

//     const restApis = await client.send(new GetRestApisCommand({}));
//     for (const [i, restApiId] of restApis.items.map(item => { return item.id }).entries()) {
//         restApiInfo[restApiId] = restApis.items[i];
//     }
//     const restApiIds = restApis.items.map(item => { return item.id });

//     return new Promise(async (resolve, reject) => {
//         await Promise.all(
//             restApiIds.map(apiId => {
//                 return (client.send(new GetResourcesCommand({ restApiId: apiId, embed: ['methods'] }))).then(result => {
//                     restApiInfo[apiId].resources = {};
//                     for (const item of result.items) {
//                         restApiInfo[apiId].resources[item.id] = item;
//                     }
//                     return result;
//                 });
//             })
//         );
//         resolve(restApiInfo);
//     })
// }

'use strict';

const tcommands = require('tcommands');
const aws = require('../../lib/awsV3');

const command = {
    name: 'listApis',
    syntax: [
        '--list-apis',
        '-lapis'
    ],
    helpText: 'List the configured REST APIs',
    handler: handler,
    after: ['awsProfile']
}

tcommands.register(command);


async function handler() {
    const apis = await aws.getRestApis();
    for (const api of Object.values(apis)) {
        console.log(`${api.name}: \n`);
        for (const resource of (Object.values(api.resources)).sort((a, b) => a.path > b.path ? 1 : -1)) {
            if (resource.path !== '/') {
                if (resource.resourceMethods) {

                    for (const resourceMethod of Object.values(resource.resourceMethods)) {
                        if (resourceMethod.httpMethod !== 'OPTIONS') {
                            let authorizer;
                            if (resourceMethod.authorizerId) {
                                authorizer = `${api.authorizers[resourceMethod.authorizerId].name} (${resourceMethod.authorizerId})`;
                            } else {
                                authorizer = 'NONE';
                            }
                            console.log(`${resourceMethod.httpMethod.padEnd(6)} ${resource.path.padEnd(55)} auth: ${authorizer}`);
                        }

                    }
                }
            }
        }
        console.log('\n');
    }
}

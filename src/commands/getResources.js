'use strict';

const tcommands = require('tcommands');
const { APIGatewayClient, GetResourcesCommand } = require('@aws-sdk/client-api-gateway');

const command = {
    name: 'getResources',
    syntax: [
        '--get-resources [restApiId]',
        '-gr [restApiId]'
    ],
    helpText: 'List the resources for the specified REST API ID',
    handler: handler,
}

tcommands.register(command);

async function handler() {
    const restApiId = tcommands.getArgValue('getResources');
    if (typeof(restApiId) !== 'string') {
        console.log('Must specify the rest API id after the command.');
        process.exit();
    }
    const client = new APIGatewayClient();
    const response = await client.send(new GetResourcesCommand({embed: ['methods'], restApiId: restApiId}));
    console.log(JSON.stringify(response, null, 2));
    for (const api of response.items) {
        console.log(`id: ${api.id}`.padEnd(20) + `name: ${api.name}`);
    }
}

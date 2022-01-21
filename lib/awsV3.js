'use strict'

const { APIGatewayClient, GetRestApisCommand, GetResourcesCommand, GetAuthorizersCommand } = require('@aws-sdk/client-api-gateway');
const { fromIni } = require('@aws-sdk/credential-providers');
const tcommands = require('tcommands');

async function getRestApis() {
  const restApiInfo = {};

  let awsProfile = tcommands.getArgValue('awsProfile');
  if (typeof (awsProfile) !== 'string') {
    awsProfile = 'default';
  }
  const client = new APIGatewayClient({ credentials: fromIni({ profile: awsProfile }) });

  const restApis = await client.send(new GetRestApisCommand({})); // Get initial list of APIs
  for (const [i, restApiId] of restApis.items.map(item => { return item.id }).entries()) {
    restApiInfo[restApiId] = restApis.items[i]; // Add the basic info for the API
  }

  const restApiIds = restApis.items.map(item => { return item.id });

  return new Promise(async (resolve, reject) => {
    await Promise.all([
      ...restApiIds.map(apiId => { // Get the authorizers for each API
        (client.send(new GetAuthorizersCommand({ restApiId: apiId }))).then(authorizers => {
          restApiInfo[apiId].authorizers = {};
          for (const authorizer of authorizers.items) {
            restApiInfo[apiId].authorizers[authorizer.id] = authorizer;
          }
        })
      }),
      ...restApiIds.map(apiId => { // Get the resources for each API
        return (client.send(new GetResourcesCommand({ restApiId: apiId, embed: ['methods'] }))).then(resources => {
          restApiInfo[apiId].resources = {};
          for (const resource of resources.items) {
            restApiInfo[apiId].resources[resource.id] = resource;
          }
        });
      })
    ]
    );
    resolve(restApiInfo);
  })
}

module.exports = {
  getRestApis
}

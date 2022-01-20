'use strict';

const tcommands = require('tcommands');
const fs = require('fs');
const ini = require('ini');

const command = {
    name: 'chooseProfile',
    syntax: [
        '--profile',
        '-p'
    ],
    helpText: 'Copy the chosen profile over the default profile',
    handler: handler,
}

tcommands.register(command);

async function handler() {
    const argument = process.argv[process.argv.length - 1];
    const configFile = `${process.env.HOME}/.aws/config`;
    const credentialsFile = `${process.env.HOME}/.aws/credentials`;

    const awsConfig = ini.parse(fs.readFileSync(configFile, 'utf-8'));
    const awsCredentials = ini.parse(fs.readFileSync(credentialsFile, 'utf-8'));

    if (argument.endsWith('/aws-profile')) {
        const defaultSecret = awsCredentials.default.aws_secret_access_key;
        const matchingSecret = Object.entries(awsCredentials).filter(entry => {
            return entry[0] !== "default" && entry[1].aws_secret_access_key == defaultSecret;
        }).map(profile => profile[0])[0];

        console.log(`Default profile currently resembles "${matchingSecret}"`);
        console.log('\n"aws-profile [profile-name]" to set the default profile to match a given profile.');
        printPossibleProfiles();
        return;
    }

    if (Object.keys(awsConfig).includes(argument) && Object.keys(awsCredentials).includes(argument)) {
        awsConfig.default.region = awsConfig[argument].region;
        awsCredentials.default.aws_access_key_id = awsCredentials[argument].aws_access_key_id;
        awsCredentials.default.aws_secret_access_key = awsCredentials[argument].aws_secret_access_key;
        fs.writeFileSync(configFile, ini.stringify(awsConfig, { whitespace: true }));
        fs.writeFileSync(credentialsFile, ini.stringify(awsCredentials, { whitespace: true }));
        console.log(`Default profile now matches profile "${argument}"`);
    } else {
        console.log(`Profile "${argument}" not found.`);
        printPossibleProfiles();
    }

    function printPossibleProfiles() {
        console.log('\nPossible profiles:');
        console.log('\n' + Object.keys(awsCredentials).filter(name => name !== 'default').join('\n'));
    }
}


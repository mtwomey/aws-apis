'use strict';

const tcommands = require('tcommands');

const command = {
    name: 'awsProfile',
    syntax: [
        '--profile'
    ],
    helpText: 'Use a specific AWS profile from your credential file',
    type: 'Option'
}

tcommands.register(command);

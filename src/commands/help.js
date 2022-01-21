'use strict';

const tcommands = require('tcommands');
const pjson = require('../../package.json');

const command = {
    name: 'help',
    syntax: [
        '--help',
        '-h'
    ],
    helpText: 'Shows this help text',
    handler: handler
}

tcommands.register(command);

async function handler() {
    console.log(`Usage: ${pjson.name} [command] [options]\n`);

    console.log(`Commands:\n`);
    Object.keys(tcommands.commands).filter(command => {
        return tcommands.commands[command].showInHelp !== false && tcommands.commands[command].type !== 'Option';
    }).forEach(command => {
        console.log(tcommands.commands[command].syntax.join(', ').padEnd(50) + tcommands.commands[command].helpText);
    })

    console.log(`\nOptions:\n`);
    Object.keys(tcommands.commands).filter(command => {
        return tcommands.commands[command].showInHelp !== false && tcommands.commands[command].type === 'Option';
    }).forEach(command => {
        console.log(tcommands.commands[command].syntax.join(', ').padEnd(50) + tcommands.commands[command].helpText);
    })
}

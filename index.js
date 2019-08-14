const moment = require('moment')
const fs = require('fs')
const Discord = require("discord.js");
const RichEmbed = require("discord.js").RichEmbed;
const client = new Discord.Client({autoReconnect:true});
const config = require("./data/config.json")
const package = require("./package.json")

client.on("message", (message) => { 	
    msg = message.content.toUpperCase()

    const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
    const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : config.testString;

    function kanyeReply() {
        fs.readFile(`./data/possibleAnswers.json`, 'utf8', function(err, data) {
            data = JSON.parse(data)
            data = data[Math.floor(Math.random() * data.length)];
            message.channel.send(data)
        })
    }
    
    if(msg.includes("KANYE")) return kanyeReply()
    if(msg.includes(`${prefix}`)) return kanyeReply()
})

client.on("message", (message) => {
    msg = message.content.toUpperCase()
    if(msg.includes('KANYE') && msg.includes("INVITE")) return message.channel.send("Invite me and all that, you know: https://discordapp.com/oauth2/authorize?client_id=587256809627320331&scope=bot&permissions=67373120")
})
client.on('error', (error) => {
    console.log('A WebSocket error has occured: ' + error)
});
client.on('disconnect', event => {
    console.log('[DISCONNECTED] Attempting to reconnect')
    client.login(config.token)
})
client.on("ready", () => {
    function setAct() {
      client.user.setActivity('over the Earth', { type: 'WATCHING' })
    }
    setInterval(setAct, 300000)
    console.log('[Logged in] ' + client.user.tag)
    console.log('[Time] ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
    
})
client.login(config.token)

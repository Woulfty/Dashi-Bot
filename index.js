//main files
require("dotenv").config();
const {Client, Intents,Collection}=require("discord.js");
const client=new Client({Intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES]});
const TOKEN = process.env['TOKEN'];
//slash command
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const dotenv = require('dotenv');
dotenv.config();
const commands = [];

//Creation of the collections
/*
client.commands = new Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}
*/
client.command = new Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.command.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

//Backup of collections
client.once("ready", () =>{
    console.log("En ligne");
    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: '9' }).setToken(TOKEN);
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                },
            );
            console.log(`Les commandes de l'application ont été enregistrées`);
        } catch (error) {
            if (error) console.error(error);
        }
    })();
})

//Interpret and respond to slash commands
client.once('interactionCreate', async (interaction) => {
    console.log(interaction)
    if (interaction.name === "ping") {
        // send an initial reply
        await interaction.reply("Pong");

        // send a followup
        const messageId = await interaction.reply({
            content: "Follow up message",
            embeds: [new MessageEmbed().setDescription("Follow up test")],
        });
    
        setTimeout(() => {
            // delete initial reply
            interaction.delete();
    
            // edit 1st followup
            interaction.edit("Edited follow up message", messageId);
        }, 5000);
    }
});

client.login(TOKEN);
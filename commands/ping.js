const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Répondre avec pong'),
    async execute(interaction) {
        interaction.reply({ content: 'Pong' })
    }
};
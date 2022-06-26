const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banane')
        .setDescription('Répondre avec banane'),
    async execute(interaction) {
        interaction.reply({ content: 'banane' })
    }
};
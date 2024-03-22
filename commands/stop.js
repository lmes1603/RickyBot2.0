const { SlashCommandBuilder } = require("@discordjs/builders")
const { QueryType, useMainPlayer } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Kick the bot from the channel."),
	execute: async ({ client, interaction }) => {

         // Get the queue for the server
		const player = useMainPlayer();
        await player.destroy();
        await interaction.reply("Se Cuidaaaan")
	},
}

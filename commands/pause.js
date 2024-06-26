const { SlashCommandBuilder } = require("@discordjs/builders")
const { useQueue , useMainPlayer } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song"),
	execute: async ({ client, interaction }) => {
        // Get the queue for the server
		const queue = useQueue(interaction.guild.id);
		queue.node.setPaused(!queue.node.isPaused());

        await interaction.reply("Player has been paused.")
	},
}

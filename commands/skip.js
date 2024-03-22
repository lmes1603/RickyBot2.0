const { SlashCommandBuilder } = require("@discordjs/builders")
const { useQueue , useMainPlayer } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),

	execute: async ({ client, interaction }) => {

        // Get the queue for the server
		const queue = useQueue(interaction.guild.id);
        if(!queue){
            await interaction.reply("There are no songs in the queue")
            return;
        }
        queue.node.skip()
        await interaction.reply("Song Skipped.")
	},
}

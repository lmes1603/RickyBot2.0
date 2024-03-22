const { SlashCommandBuilder } = require("@discordjs/builders")
const { QueryType, useMainPlayer, Player } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Kick the bot from the channel."),
	execute: async ({ client, interaction }) => {

         // Get the queue for the server
		var player = null;
        try{
            player = useMainPlayer();    
        }catch(e){
            player = new Player(client);
        }
        await player.destroy();
        await interaction.reply("Se Cuidaaaan")
	},
}

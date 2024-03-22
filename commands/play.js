const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder  } = require("discord.js")
const { QueryType, useMainPlayer, Player  } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song from name or YouTube link.")
		.addStringOption(option =>
                    option.setName("query").setDescription("search keywords").setRequired(true)
                ),
	execute: async ({ client, interaction }) => {
        // Make sure the user is inside a voice channel
		if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");

        // Create a play queue for the server
		const queue = await client.player.nodes.create(interaction.guild)
        // Wait until you are connected to the channel
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		var player = null;
        try{
            player = useMainPlayer();    
        }catch(e){
            player = new Player(client);
        }
		
        await player.extractors.loadDefault();
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel
    
        const query = interaction.options.getString('query', true); // we need input/query to play
        // let's defer the interaction as things can take time to process
        await interaction.deferReply();

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction // we can access this metadata object using queue.metadata later on
                }
            });

            return interaction.followUp(`**${track.title}** enqueued!`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Something went wrong: ${e}`);
        }
        
        // Respond with the embed containing information about the player
       // await interaction.reply("Player has been resumed.")

	},
}

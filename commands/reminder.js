const { SlashCommandBuilder } = require('@discordjs/builders');
const parseTime = require('../utils/parseTime')
const commandValidator = require('../utils/command-validator')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reminder')
        .setDescription('Remind you to do something...')
        .addStringOption(option => option.setName('input')
            .setDescription('[what to do] [XX:YY]')
            .setRequired(true)),
    async execute(interaction) {
        const reminderString = interaction.options.getString('input')
        const parsedCommand = commandValidator(reminderString)

        if (!parsedCommand) return await interaction.reply("Please input both `what to do` and `when` [XX:YY] 24 hours format")

        const { todo, time } = parsedCommand

        const jobId = setTimeout((async(interaction) => {
            const client = interaction.client
            client.channels.cache.get(interaction.channelId).send(`YO ${interaction.user} it's time for \`${todo}\``)
        }).bind(null, interaction), parseTime(time))

        await interaction.reply(`Got it :white_check_mark: Your job id is: \`${jobId}\``)
    },
};
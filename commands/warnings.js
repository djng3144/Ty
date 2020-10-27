const { mongoose } = require('mongoose');
const mongo = require('..//mongo')
const warnSchema = require('..//schema/warn-schema')

module.exports = {

    name: "warnings",
    description: "View warnings of a member.",

    async run(message, args, bot) {
        const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify a user to load the warnings for.')
      return
    }

    const guildId = message.guild.id
    const userId = target.id

    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          userId,
        })

        let reply = `Previous warnings for <@${userId}>:\n\n`

        for (const warning of results.warnings) {
          const { author, timestamp, reason } = warning

          reply += `By ${author} on ${new Date(
            timestamp
          ).toLocaleDateString()} for "${reason}"\n\n`
        }

        message.reply(reply)
      } finally {
        mongoose.connection.close()
      }
    })




    }}
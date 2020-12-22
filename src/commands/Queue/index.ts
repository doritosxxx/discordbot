import ICommand from '../../class/ICommand'
import type { Message } from 'discord.js'
import { ConditionError } from '../../error'

import { guild } from '../../database'

class CommandQueue implements ICommand {
	name:string = 'queue'
	description:string = 'Показать текущую очередь треков'
	help:string = 'queue - Показать текущую очередь треков'
	
	async execute(message:Message, args: string[]): Promise<void>{

		if(message.guild === null)
			throw new ConditionError("Команда доступна только на сервере.")

		const tracks = (await guild.track.getQueue(+message.guild.id)).map((track,i) => `${i+1}. ${track.query}`)
		
		message.channel.send(`Очередь треков:\n${tracks.join("\n")}`)
		
	}
}

export default new CommandQueue()
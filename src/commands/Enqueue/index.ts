import ICommand from '../../class/ICommand'
import type { Message } from 'discord.js'
import { ArgumentError, ConditionError } from '../../error'

import { guild } from '../../database'

class CommandEnqueue implements ICommand {
	name:string = 'enqueue'
	description:string = 'Добавить трек в очередь'
	help:string = 'enqueue <name> - Добавить трек с названием name в очередь'
	
	async execute(message:Message, args: string[]): Promise<void>{

		if(message.guild === null)
			throw new ConditionError("Команда доступна только на сервере.")

		if(args.length < 1)
			throw new ArgumentError("Не указана ссылка на трек.")

		// TODO check url and data source.


		try {
			await guild.track.enqueue(+message.guild.id, args[0])
			message.channel.send("Трек добавлен в очередь.")
		}
		catch {
			message.channel.send("Произошла ошибка при добавлении.")
		}
		
	}
}

export default new CommandEnqueue()
import ICommand from '../../class/ICommand'
import type { Message } from 'discord.js'
import { ArgumentError, ConditionError } from '../../error'

import { guild } from '../../database'

class CommandSkip implements ICommand {
	name:string = 'skip'
	description:string = 'Пропустить трек'
	help:string = [
		'skip - Пропустить текущий трек',
		'skip all - Очистить очередь'
	].join("\n")
	
	async execute(message:Message, args: string[]): Promise<void>{

		if(message.guild === null)
			throw new ConditionError("Команда доступна только на сервере.")

		let take:number = 1
		if(args.length >= 1){
			if(args[0] == 'all'){
				guild.track.deleteQueue(+message.guild.id)
				message.channel.send(`Очередь очищена.`)
				return;
			}
			take = parseInt(args[0])
			if(Number.isNaN(take))
				throw new ArgumentError("Первый аргумент должен быть целым числом")	
		}
		
		const tracks = await guild.track.getFirstInGuildQueue(+message.guild.id, take)
		if(tracks.length === 0)
			throw new ConditionError("Очередь треков пуста.")
		

		try {
			for(const track of tracks)
				await guild.track.delete(track.id)
			message.channel.send(`Пропущено ${tracks.length} треков. (мне лень делать окончания)`)
		}
		catch {
			message.channel.send("Произошла ошибка при удалении.")
		}
		
	}
}

export default new CommandSkip()
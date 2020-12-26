import ICommand from '../../class/ICommand'

import type { Message } from 'discord.js'
import { ConditionError, ArgumentError } from '../../error'

import youtubeSearch, { Video } from 'ytsr'

import VoiceStream from '../../runtime/VoiceStream'
import { TrackState } from '../../class'
import { guild } from '../../database'

class CommandTest implements ICommand {
	name:string = 'args'
	description:string = 'pee pee poo poo check'
	help:string = 'пох'
	
	async execute(message:Message, args: string[]): Promise<void>{
		
		if(args.length == 0)
			throw new ArgumentError("пидарас")

		if(!message.member?.voice.channel)
			throw new ConditionError("в войс зайди")
		
		if(!message.guild?.id)
			throw new ConditionError("Команда доступна только на сервере.")
		const guildId = +message.guild.id
			
		const queryUrl = (await youtubeSearch.getFilters(args[0])).get("Type")?.get("Video")?.url
		if(!queryUrl)
			throw new ArgumentError("запрос не обрабатывается")
		const result:Video = (await youtubeSearch(queryUrl, {
			limit: 1,
		})).items[0] as Video
		const url = result.url
			
		const track = new TrackState(result.title, result.url)

		await guild.track.enqueue(guildId, url)
		if(!VoiceStream.exists(guildId))
			await VoiceStream.create(message.member.voice.channel)
		
	}
}

export default new CommandTest()
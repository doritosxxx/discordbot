import { TrackState } from '../class'
import { Client, Collection, Guild, VoiceChannel, VoiceConnection } from 'discord.js'
import { InternalError } from '../error'

import { guild } from '../database'

import ytdl from 'ytdl-core'

const connections = new Collection<number, VoiceConnection>()

class VoiceStream {
	readonly guildId:number
	readonly connection:VoiceConnection

	private constructor(guildId:number){
		this.guildId = guildId
		const connection = connections.get(guildId)
		if(connection === undefined)
			throw new InternalError("Voice connection with provided guildId doensn't exists.")

		this.connection = connection
	}

	private async playNext(){
		const guildId = this.guildId
		const tracks = await guild.track.getFirstInGuildQueue(guildId)
		if(tracks.length === 0){
			const connection = connections.get(guildId)
			if(connection !== undefined){
				connection.disconnect()
				connections.delete(guildId)
			}
			return;
		}
		const track = tracks[0]
		await guild.track.delete(track.id)
		const connection = connections.get(guildId)
		if(connection === undefined)
			throw new InternalError("Connection doesn't exists")
	
		const dispatcher = connection.play(ytdl(track.url, {
			quality: 'highestaudio',
			filter: 'audioonly'
		}))
		dispatcher.on("start", () => "сообщение о начале воспроизведения")
		dispatcher.on("finish", () => this.playNext())
	}

	static async create(voiceChannel: VoiceChannel): Promise<void>{
		const guildId = +voiceChannel.guild.id
		if(connections.has(guildId))
			throw new InternalError("Another track is playing. You should push it into the database instead.")
		
		await guild.setVoiceChannel(guildId, +voiceChannel.id)

		const connection = await voiceChannel.join()
		connections.set(guildId, connection)
		
		new VoiceStream(guildId).playNext()
	}

	static exists(guildId:number):boolean{
		return connections.has(guildId)
	}

	static async onBoot(){
		// Deletes all tracks. 
		// It should resume all voice connections from the database instead.
		// But which of the voice channels I should choose. :thinking:
		await guild.track.deleteAll()
		/*
		(await guild.getAll()).forEach(guild => {
			if(guild.voiceChannelId)
				VoiceStream.create(fuck)
		})
		*/
	}
}


export default VoiceStream
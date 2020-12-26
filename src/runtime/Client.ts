import { Client } from 'discord.js'

class Singleton {
	private constructor(){}
	private static instance: Client|null = null

	public static Instance(): Client {
		return Singleton.instance === null ? new Client() : Singleton.instance
	}
}


export default Singleton.Instance()
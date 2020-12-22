// Database client
import { PrismaClient } from "@prisma/client"
import type { Guild, Track } from "@prisma/client"
const prisma = new PrismaClient()


class TrackMethods {

	static async enqueue(guildId: number, url: string): Promise<Track> {
		return await prisma.track.create({
			data: {
				query: url,
				url: url,
				Guild: {
					connect: { id: guildId }
				},
			},
		})
	}

	static async delete(id: number): Promise<Track> {
		return await prisma.track.delete({
			where: { id: id },
		})
	}

	static async deleteQueue(guildId: number): Promise<void> {
		await prisma.track.deleteMany({
			where: { guildId }
		})
	}

	static async getFirstInGuildQueue(guildId: number, take: number): Promise<Track[]>
	static async getFirstInGuildQueue(guildId: number): Promise<Track[]>
	static async getFirstInGuildQueue(guildId: number, take:number = 1): Promise<Track[]> {
		return await prisma.track.findMany({
			where: { guildId: guildId },
			take: take
		})
	}

	static async getQueue(guildId:number) :Promise<Track[]>{
		return await prisma.track.findMany({
			where:{ guildId : guildId }
		})
	}
}

const guild = {
	async delete(id: number): Promise<void> {
		// In case if guild doesn't exists.
		try {
			await prisma.guild.delete({
				where: {
					id: id,
				},
			})
		} catch {}
	},

	async create(id: number): Promise<Guild> {
		// Dirty code.
		await this.delete(id)
		return await prisma.guild.create({
			data: { id },
		})
	},

	track: TrackMethods,
}

export { guild, prisma }

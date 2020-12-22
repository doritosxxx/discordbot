// Database client
import { PrismaClient } from '@prisma/client'
import type { Guild } from '@prisma/client'
const prisma = new PrismaClient()


const guild = {
	async delete(id: number): Promise<void>{
		// In case if guild doesn't exists.
		try {
			await prisma.guild.delete({
				where :{
					id: id,
				}
			})
		}
		catch {}
	},

	async create(id:number): Promise<Guild> {
		// Dirty code.
		await this.delete(id)
		return await prisma.guild.create({
			data: { id }
		})
	}
}


export { 
	guild,
	prisma
}
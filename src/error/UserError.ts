import BotError from './BotError'

class UserError extends BotError {
	constructor(message?:string){
		super(message)
		this.name = "UserError"
	}
}

export default UserError
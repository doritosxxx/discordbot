import BotError from './BotError'

class InternalError extends BotError {
	constructor(message?:string){
		super(message)
		this.name = "InternalError"
	}
}

export default InternalError
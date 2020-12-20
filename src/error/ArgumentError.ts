import UserError from './UserError'

class ArgumentError extends UserError {
	constructor(message?:string){
		super(message)
		this.name = "ArgumentError"
	}
}

export default ArgumentError
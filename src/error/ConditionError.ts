import UserError from './UserError'

class ConditionError extends UserError {
	constructor(message?:string){
		super(message)
		this.name = "ConditionError"
	}
}

export default ConditionError
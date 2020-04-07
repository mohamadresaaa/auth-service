const { Schema, model } = require("mongoose")
const { v4 } = require("uuid")

const verificationCodeSchema = new Schema({
	code: {
		default: v4,
		required: true,
		type: String,
		unique: true
	},
	expiryDate: {
		required: true,
		type: Date
	},
	for: {
		required: true,
		type: String
	},
	used: {
		default: false,
		type: Boolean
	},
	user: {
		ref: "User",
		required: true,
		type: Schema.Types.ObjectId
	}
})

// Index fields
verificationCodeSchema.index({ code: 1 })
verificationCodeSchema.index({ expiryDate: -1 })

module.exports = model("VerificationCode", verificationCodeSchema)
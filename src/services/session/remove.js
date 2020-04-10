module.exports = async (controller, id, res) => {
	try {
		// Session model
		const { Session } = controller[Symbol.for("models")]

		// Find and remove session
		await Session.deleteOne({ _id: id })

		// Return message
		return controller.infoMessage(res, 200, {
			message: "Session was deleted"
		})
	} catch (error) {
		throw error
	}
}
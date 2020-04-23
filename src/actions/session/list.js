module.exports = async (controller, currentSession, res) => {
	try {
		// Session model
		const { Session } = controller[Symbol.for("models")]

		// Find sessions of user
		const sessions = await Session.find({ user: currentSession.user }).select("_id device ip createdAt").lean()

		// Set current session on list of session
		sessions.map(item => {
			item._id == currentSession.id ? item.isCurrent = true : item.isCurrent = false
			item.createdAt = item.createdAt.toISOString().slice(0, 10)
		})

		// Sort sessions
		sessions.sort((x, y) => x.isCurrent < y.isCurrent ? 1 : -1)

		// Return sessions
		return controller.infoMessage(res, 200, {
			sessions
		})
	} catch (error) {
		throw error
	}
}
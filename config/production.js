module.exports = {
	[Symbol.for("database url")]: process.env.DATABASE_URL,
	port: process.env.PORT || 4000
}
module.exports = {
	[Symbol.for("database url")]: process.env.DATABASE_URL,
	[Symbol.for("private key")]: process.env.PRIVATE_KEY,
	[Symbol.for("public key")]: process.env.PUBLIC_KEY,
	port: process.env.PORT || 4000
}
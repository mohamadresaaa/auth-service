module.exports = {
	[Symbol.for("database url")]: "mongodb://127.0.0.1:27017/auth-service",
	[Symbol.for("private key")]: process.env.PRIVATE_KEY || "privateKey",
	[Symbol.for("public key")]: process.env.PUBLIC_KEY || "publicKey",
	port: process.env.PORT || 3000,
}
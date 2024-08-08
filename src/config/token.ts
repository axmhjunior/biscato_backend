require('dotenv').config()

export const TokenConfig = {
    secret: process.env.JWT_TOKEN_SECRET || "",
    expiressIn: "1d"
}
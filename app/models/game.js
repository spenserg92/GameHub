const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
        developer: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
		releaseYear: {
			type: String,
		},
        genre: {
            type: String
        },

	},
	{
		timestamps: true,
	}
)

module.exports = gameSchema
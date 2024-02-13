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
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
        platform: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Platform"
        }
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Game', gameSchema)
const mongoose = require('mongoose')
const gameSchema = require('./game')
const platformSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		releaseYear: {
			type: String,
			min: 4,
			max: 4,
		},
        manufacturer: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		games: [gameSchema]
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Platform', platformSchema)
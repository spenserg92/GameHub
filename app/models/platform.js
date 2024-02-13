const mongoose = require('mongoose')

const platformSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		releaseYear: {
			type: Date,
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
		games: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Game'
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Platform', platformSchema)
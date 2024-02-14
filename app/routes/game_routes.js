const express = require('express')
const passport = require('passport')
const Platform = require('../models/platform')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


// CREATE
// POST /games/6ege61g6eg16es
router.post('/games/:platformId', removeBlanks, (req, res, next) => {
	const game = req.body.game
	const platformId = req.params.platformId
	
	Platform.findById(platformId)
	.then(handle404)
	.then((platform) => {
		platform.games.push(game)

		return platform.save()
	})
	.then(platform => res.status(201).json({ platform: platform }))
	.catch(next)
})

// UPDATE
// PATCH /games/5a7db6c74d55bc51bdf39793/4g6t4g65e46t4g
router.patch('/games/:platformId/:gameId', removeBlanks, (req, res, next) => {
	const {platformId, gameId} = req.params
	Platform.findById(platformId)
		.then(handle404)
		.then((platform) => {
			const theGame = platform.games.id(gameId)
			// requireOwnership(req, platform)
			theGame.set(req.body.game)
			return platform.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /games/5a7db6c74d55bc51bdf39793/6516546515665
router.delete('/games/:platformId/:gameId', removeBlanks, (req, res, next) => {
	// let's grab both ids from req.params
    const { platformId, gameId } = req.params

	Platform.findById(platformId)
		.then(handle404)
		.then((platform) => {
            const theGame = platform.games.id(gameId)
			
			// requireOwnership(req, platform)

            theGame.deleteOne()
			return platform.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router

const express = require('express')
const passport = require('passport')
const Game = require('../models/game')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /games
router.get('/games', (req, res, next) => {
	Game.find()
        .populate('owner')
		.then((games) => {
			return games.map((game) => game.toObject())
		})
		.then((games) => res.status(200).json({ games: games }))
		.catch(next)
})

//SHOW games/mine
router.get('/games/mine', requireToken, (req, res, next) => {
	Game.find({owner: req.user.id})
		.then((games) => {
			return games.map((game) => game.toObject())
		})
		.then((games) => res.status(200).json({ games: games }))
		.catch(next)
})

// SHOW
// GET /games/5a7db6c74d55bc51bdf39793
router.get('/games/:id', (req, res, next) => {
	Game.findById(req.params.id)
        .populate('owner')
		.then(handle404)
		.then((game) => res.status(200).json({ game: game.toObject() }))
		.catch(next)
})

// CREATE
// POST /games
router.post('/games', requireToken, (req, res, next) => {
	req.body.game.owner = req.user.id

	Game.create(req.body.game)
		.then((game) => {
			res.status(201).json({ game: game.toObject() })
		})
		.catch(next)
})

// UPDATE
// PATCH /games/5a7db6c74d55bc51bdf39793
router.patch('/games/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.game.owner
	Game.findById(req.params.id)
		.then(handle404)
		.then((game) => {
			requireOwnership(req, game)
			return game.updateOne(req.body.game)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /games/5a7db6c74d55bc51bdf39793
router.delete('/games/:id', requireToken, (req, res, next) => {
	Game.findById(req.params.id)
		.then(handle404)
		.then((game) => {
			requireOwnership(req, game)
			game.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router

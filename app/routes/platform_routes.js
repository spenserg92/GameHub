const express = require('express')
const passport = require('passport')
const Platform = require('../models/platform')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /platforms
router.get('/platforms', (req, res, next) => {
	Platform.find()
		.then((platforms) => {
			return platforms.map((platform) => platform.toObject())
		})
		.then((platforms) => res.status(200).json({ platforms: platforms }))
		.catch(next)
})

// SHOW
// GET /platforms/5a7db6c74d55bc51bdf39793
router.get('/platforms/:id', (req, res, next) => {
	Platform.findById(req.params.id)
		.then(handle404)
		.then((platform) => res.status(200).json({ platform: platform.toObject() }))
		.catch(next)
})

// CREATE
// POST /platforms
router.post('/platforms', requireToken, (req, res, next) => {
	req.body.platform.owner = req.user.id

	Platform.create(req.body.platform)
		.then((platform) => {
			res.status(201).json({ platform: platform.toObject() })
		})
		.catch(next)
})

// UPDATE
// PATCH /platforms/5a7db6c74d55bc51bdf39793
router.patch('/platforms/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.platform.owner
	Platform.findById(req.params.id)
		.then(handle404)
		.then((platform) => {
			requireOwnership(req, platform)
			return platform.updateOne(req.body.platform)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /platforms/5a7db6c74d55bc51bdf39793
router.delete('/platforms/:id', requireToken, (req, res, next) => {
	Platform.findById(req.params.id)
		.then(handle404)
		.then((platform) => {
			requireOwnership(req, platform)
			platform.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router

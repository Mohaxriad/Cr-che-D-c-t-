const express = require('express');
const router = express.Router();
const searchController = require('../controllers/SearchController');
const searchMiddleware = require('../middleware/parseQueryFilter');



router.route('/search').get(searchMiddleware.ParseQueryString, searchController.findCrecheByFilters)
router.route('/random').get( searchController.getRandomCreches)

module.exports = router;
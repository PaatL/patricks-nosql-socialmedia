const router = require("express").Router();
const {getThoughts, createThought, updateThought, deleteThought, getSingleThought} = require('../../controllers/thoughtController');


router.route('/')
.get(getThoughts)
.post(createThought);

router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);
module.exports = router;
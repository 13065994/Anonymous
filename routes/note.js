const express = require('express');
const router = express.Router();
const { renderNote, getNote, createOrUpdateNote, updatePassword } = require('../controllers/noteController');

// /api/:endpoint
router.get('/:endpoint?', renderNote);
router.post('/api/getNote', getNote);
router.post('/:endpoint/update-password', updatePassword);
router.post('/:endpoint', createOrUpdateNote);

module.exports = router;

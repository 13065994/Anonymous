const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Note = require('../models/Note');

exports.renderNote = (req, res) => {
	const { endpoint } = req.params;
	if (!endpoint) {
		const newEndpoint = uuidv4().replace(/-/g, '').slice(0, 16);
		return res.redirect(`/${newEndpoint}`);
	}

	res.render('index', { endpoint });
};

exports.getNote = async (req, res) => {
	const { password, endpoint, author } = req.body;

	if (!endpoint) {
		const newEndpoint = uuidv4().replace(/-/g, '').slice(0, 16);
		return res.redirect(`/${newEndpoint}`);
	}

	const note = await Note.findByPk(endpoint);

	if (note) {
		const isPasswordValid = note.password ? await bcrypt.compare(password, note.password) : true;
		return res.json({
			endpoint: note.endpoint,
			content: isPasswordValid ? note.content : "<THIS_NOTE_IS_PASSWORD_PROTECTED>",
			hasPassword: !!note.password
		});
	}

	const newNote = await Note.create({
		endpoint,
		content: "",
		author: author || null,
		password
	});
	return res.json({
		endpoint: newNote.endpoint,
		content: "",
		hasPassword: false
	});
};

exports.createOrUpdateNote = async (req, res) => {
	const { endpoint } = req.params;
	const { content, password, author } = req.body;

	let note = await Note.findByPk(endpoint);

	if (!note) {
		note = await Note.create({
			endpoint,
			content,
			author: author || null,
			password: null
		});
	}
	else if (note.password && !await bcrypt.compare(password, note.password)) {
		return res.status(403).json({
			error: 'Forbidden: Incorrect password'
		});
	}

	note.content = content;
	await note.save();

	return res.sendStatus(200);
};

exports.updatePassword = async (req, res) => {
	const { endpoint } = req.params;
	const { password = "", author } = req.body;

	const note = await Note.findByPk(endpoint);

	if (!note) {
		return res.status(404).json({
			error: 'Not found',
			content: "<THIS_NOTE_DOES_NOT_EXIST>"
		});
	}

	if (author !== note.author) {
		if (note.password && !await bcrypt.compare(password, note.password)) {
			return res.status(403).json({
				error: 'Forbidden: Incorrect author',
				content: "<THIS_NOTE_IS_PASSWORD_PROTECTED>"
			});
		}
		return res.json({
			content: note.content
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	note.password = hashedPassword;
	if (!password) {
		note.password = null;
	}
	await note.save();

	return res.json({
		message: 'Password updated',
		content: note.content,
		hasPassword: true
	});
};

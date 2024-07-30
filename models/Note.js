const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Note = sequelize.define('Note', {
	endpoint: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	password: {
		type: DataTypes.STRING, // lưu trữ hash của mật khẩu
		allowNull: true
	},
	author: {
		type: DataTypes.JSONB, // lưu trữ thông tin phân biệt người dùng
		allowNull: true
	}
});

module.exports = Note;

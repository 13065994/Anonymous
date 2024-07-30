const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "database.sqlite",
	logging: false
});

// or use mysql with ssl
// const sequelize = new Sequelize(
// 	"<database name>",
// 	"<username>",
// 	"<password>",
// 	{
// 		host: "<host>",
// 		port: 27063,
// 		dialect: "mysql",
// 		dialectOptions: {
// 			ssl: {
// 				ca: fs.readFileSync(__dirname + "/db_ca.pem").toString(), // ca file for mysql
// 				rejectUnauthorized: true // reject if ca is invalid
// 			}
// 		},
// 		logging: false
// 	}
// );

module.exports = sequelize;

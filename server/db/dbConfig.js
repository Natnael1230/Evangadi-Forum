const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
	user: "evangadi-admin",
	database: "try_evangadi",
	host: "localhost",
	password: "12345",
	connectionLimit: 10,
});

dbConnection.execute("select 'test'");
// dbConnection



module.exports=dbConnection.promise();

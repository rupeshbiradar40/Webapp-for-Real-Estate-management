const mongoose = require("mongoose");
const restify = require("restify");
const fs = require("fs");
const corsMiddleware = require("restify-cors-middleware");

const cors = corsMiddleware({
	preflightMaxAge: 5, //Optional
	origins: ["http://localhost:4200", "http://localhost"],
	allowHeaders: [""],
});

const server = restify.createServer();
server.pre(cors.preflight);
server.pre(restify.pre.sanitizePath());
server.use(cors.actual);

// server.use(function(req, res, next) {
//     console.log("Got a " + req.method + " request: "+JSON.stringify(req.body))
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//     });

server.use(restify.plugins.bodyParser());
// server.get(
// 	"/uploads/:id",
// 	restify.plugins.serveStatic({ directory: "./uploads" })
// );
server.get("/static/:id", function (req, res, next) {
	fs.readFile("./uploads/" + req.params.id, function (err, data) {
		if (err) {
			res.send({
				status: 500,
				statusText: err.message,
				data: err,
			});
		}
		res.end(data);
		next();
	});
});
server.listen(3000, () => {
	mongoose.set("useFindAndModify", false);
	mongoose.connect(
		"mongodb+srv://root:root@cluster0-1ebmq.mongodb.net/pms?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));

db.once("open", () => {
	require("./routes/user")(server);
	require("./routes/property")(server);
	console.log(`Server started on port`);
});

// app.use(bodyParser.json());

// const DB = process.env.DATABASE.replace(
//     '<password>',
//     process.env.DATABASE_PASSWORD
//   );

// console.log(DB);
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true

//   })
//   .then(() => console.log('DB connnection successful!'));

//Set up default mongoose connection
// var mongoDB = 'mongodb+srv://root:root@cluster0-1ebmq.mongodb.net/test?retryWrites=true&w=majority';
// mongoose.connect(mongoDB, { useNewUrlParser: true,useCreateIndex: true,
//     useFindAndModify: false,useUnifiedTopology: true });

// //Get the default connection
// var db = mongoose.connection; //Bind connection to error event (to get notification of connection errors)

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(3000)

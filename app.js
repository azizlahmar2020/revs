const express = require("express");
const http = require("http");
const path = require("path"); 

const socketIO = require("socket.io"); 

const logger = require("morgan");
const createError = require("http-errors");
const { default: mongoose } = require("mongoose");
const mongooseConfig = require("./database/dbConfig.json");
const studentRouter = require("./routers/student");
const joueurRoutes =require ("./routers/JoueurRoutes")
const partieRoutes = require ("./routers/PartieRoutes")
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer); 
app.set("views", path.join(__dirname, "views")); 
app.set("view engine","twig");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/students", studentRouter);
app.use("/joueur",joueurRoutes);
app.use("/partie",partieRoutes)



app.use((req, res, next) => {
    next(createError(404));
});



io.on("connection",(socket)=>
{
    console.log("A user has connected");
    socket.on("disconnect",()=>
    {
        console.log("A user has disconnected");
    });
    socket.on("chat message",(msg)=>
    {
        console.log("message: "+msg);
        io.emit("chat message",msg);
    });
});

// mongoose
mongoose.connect("mongodb://127.0.0.1:27017/Devr", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

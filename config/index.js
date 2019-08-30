exports = module.exports = function (app) {

    console.log("process.env.MONGO_URI ========= ", process.env.MONGO_URI);

    if (process.env.NODE_ENV === "production") {
        app.set("showLogs", true)
        app.set("mongodb-url", process.env.MONGO_URI)

    } else {
        app.set("showLogs", true)
        app.set("mongodb-url", "mongodb://mansoor:mansoor11@ds137596.mlab.com:37596/rozee")

    }
}
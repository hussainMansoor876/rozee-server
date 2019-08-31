exports = module.exports = function (app) {

    console.log("process.env.MONGO_URI ========= ", process.env.MONGO_URI);
    console.log("process.env.cloudinary_name ========= ", process.env.cloudinary_name);
    console.log("process.env.cloudinary_key ========= ", process.env.cloudinary_key);
    console.log("process.env.cloudinary_secret ========= ", process.env.cloudinary_secret);

    if (process.env.NODE_ENV === "production") {
        app.set("showLogs", true)
        app.set("mongodb-url", process.env.MONGO_URI)
        app.set("cloudinary_name", process.env.cloudinary_name)
        app.set("cloudinary_key", process.env.cloudinary_key)
        app.set("cloudinary_secret", process.env.cloudinary_secret)

    } else {
        app.set("showLogs", true)
        app.set("mongodb-url", "mongodb://mansoor:mansoor11@ds137596.mlab.com:37596/rozee")
        app.set("cloudinary_name", "dklfq58uq")
        app.set("cloudinary_key", "731492993649535")
        app.set("cloudinary_secret", "nSfb5hNghIDf9GITZavliVERls4")

    }
}
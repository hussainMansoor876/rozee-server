exports = module.exports = function(app) {
    
    app.log = function (message1, message2){
        if(app.get('showLogs')) {
            console.log("Log :: "+message1,message2);
        }
    }
    app.logLevel1 = function (message1, message2){
        console.log("LogLevel1 :: "+message1,message2);
    }
}
  
  
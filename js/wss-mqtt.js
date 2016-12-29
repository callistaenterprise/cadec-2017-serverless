
function IoTEventListener() {}

IoTEventListener.initialize = function(cb) {

    var credentials = { accessKeyId: 'AKIAIEEGFOZMSU5PHIHQ', 
                        secretAccessKey: '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', 
                        sessionToken: null };

    var requestUrl = SigV4Utils.getSignedUrl('a3k85fof722r8f.iot.eu-west-1.amazonaws.com', 'eu-west-1', credentials);

    var clientId = String(Math.random()).replace('.', '');
    var client = new Paho.MQTT.Client(requestUrl, clientId);
    

    client.onMessageArrived = function (message) {

        try {
            console.log("msg arrived: " +  message.payloadString);
            var data = JSON.parse(message.payloadString);
            cb(data)
        } catch (e) {
            console.log("error: " + e);
        }
    };

    var connectOptions = {
        onSuccess: function() {
            // connect succeeded
            console.log("Successfully connected to MQTT with client-id: " + clientId);
            client.subscribe("iotprocessed");
        },
        useSSL: true,
        timeout: 3,
        mqttVersion: 4,
        keepAliveInterval: 30,
        onFailure: function(e) {
            console.log("error: unable to connect " + e);
        }
    };

    client.connect(connectOptions);

    client.onConnectionLost = function (responseObject) {
        console.log("connection lost: " + responseObject.errorMessage);
        client.connect(connectOptions);
    };

};




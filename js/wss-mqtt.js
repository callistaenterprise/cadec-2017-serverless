
function IoTEventListener() {}

IoTEventListener.initialize = function(cb) {

    var requestUrl = SigV4Utils.getSignedUrl('a3k85fof722r8f.iot.eu-west-1.amazonaws.com', 'eu-west-1', credentials);

    var clientId = String(Math.random()).replace('.', '');
    var client = new Paho.MQTT.Client(requestUrl, clientId);
    

    client.onMessageArrived = function(message) {

        try {
            log("msg arrived: " +  message.payloadString);
            var data = JSON.parse(message.payloadString);
            cb(data)
        } catch (e) {
            log(e);
        }
    };

    var connectOptions = {
        onSuccess: function() {
            // connect succeeded
            log("Successfully connected to MQTT with client-id: " + clientId);
            client.subscribe("iotprocessed");
        },
        useSSL: true,
        timeout: 3,
        mqttVersion: 4,
        keepAliveInterval: 30,
        onFailure: function(e) {
            log("error: unable to connect " + e);
        }
    };

    client.connect(connectOptions);

    client.onConnectionLost = function (responseObject) {
        log("connection lost: " + responseObject.errorMessage);
        client.connect(connectOptions);
    };

};




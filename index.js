"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttConnection = void 0;
var mqtt_1 = require("mqtt");
var MqttConnection = /** @class */ (function () {
    function MqttConnection(brokerUrl, options) {
        this.brokerUrl = brokerUrl;
        this.options = options;
        this.client = (0, mqtt_1.connect)(brokerUrl, options);
        this.registerEventHandlers();
    }
    MqttConnection.prototype.registerEventHandlers = function () {
        this.client.on('connect', this.onConnect);
        this.client.on('message', this.onMessage);
        this.client.on('error', this.onError);
        this.client.on('close', this.onClose);
        this.client.on('disconnect', this.onDisconnect);
    };
    MqttConnection.prototype.onConnect = function () {
        console.log('Connected to MQTT broker');
    };
    MqttConnection.prototype.onMessage = function (topic, message) {
        console.log('Received message from topic:', topic);
        console.log('Message:', message.toString());
    };
    MqttConnection.prototype.onError = function (error) {
        console.error('MQTT error:', error);
    };
    MqttConnection.prototype.onClose = function () {
        console.log('MQTT connection closed');
    };
    MqttConnection.prototype.onDisconnect = function () {
        console.log('MQTT client disconnected');
    };
    MqttConnection.prototype.subscribe = function (topic, callback) {
        this.client.subscribe(topic, { qos: 0 }, function (err, granted) {
            if (err) {
                console.error('Error while subscribing:', err);
            }
            else {
                console.log('Subscribed to topic:', topic);
            }
        });
        this.client.on('message', callback);
    };
    MqttConnection.prototype.publish = function (topic, message) {
        this.client.publish(topic, message);
    };
    MqttConnection.prototype.unsubscribe = function (topic) {
        this.client.unsubscribe(topic, function (err) {
            if (err) {
                console.error('Error while unsubscribing:', err);
            }
            else {
                console.log('Unsubscribed from topic:', topic);
            }
        });
    };
    MqttConnection.prototype.end = function () {
        this.client.end();
    };
    return MqttConnection;
}());
exports.MqttConnection = MqttConnection;

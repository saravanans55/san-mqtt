# MQTT Adapter Node Module

## Description
This is a Node.js module that provides a wrapper for connecting to an MQTT broker and performing basic publish-subscribe operations.

## Installation
To use this module in your project, you can install it via npm:

```bash
npm install mqtt-adapter
```

## Usage
Here's an example of how you can use this module in your code:

```javascript
import { MqttConnection } from 'mqtt-adapter';

// Create a new MQTT connection
const brokerUrl = 'mqtt://localhost'; // Replace with your MQTT broker URL
const connection = new MqttConnection(brokerUrl);

// Subscribe to a topic
const topic = 'my/topic';
connection.subscribe(topic, (receivedTopic, message) => {
  console.log('Received message from topic:', receivedTopic);
  console.log('Message:', message.toString());
});

// Publish a message
const message = 'Hello, MQTT!';
connection.publish(topic, message);

// Unsubscribe from a topic
connection.unsubscribe(topic);

// Close the MQTT connection
connection.end();
```

## API

### `MqttConnection(brokerUrl: string, options?: IClientOptions)`

Creates a new MQTT connection instance.

- `brokerUrl`: The URL of the MQTT broker to connect to.
- `options`: Optional configuration options for the MQTT client.

### `subscribe(topic: string, callback: (topic: string, message: Buffer) => void)`

Subscribes to a specific MQTT topic and registers a callback function to handle received messages.

- `topic`: The topic to subscribe to.
- `callback`: The callback function that will be invoked when a message is received on the subscribed topic.

### `publish(topic: string, message: string)`

Publishes a message to a specific MQTT topic.

- `topic`: The topic to publish the message to.
- `message`: The message to publish.

### `unsubscribe(topic: string)`

Unsubscribes from a specific MQTT topic.

- `topic`: The topic to unsubscribe from.

### `end()`

Closes the MQTT connection.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This module is licensed under the MIT License.

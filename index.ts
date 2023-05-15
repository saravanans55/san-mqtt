import { connect,MqttClient, IClientOptions } from 'mqtt';

export class MqttConnection {
  private client: MqttClient;

  constructor(private brokerUrl: string, private options?: IClientOptions) {
    this.client = connect(brokerUrl, options);
    this.registerEventHandlers();
  }

  private registerEventHandlers(): void {
    this.client.on('connect', this.onConnect);
    this.client.on('message', this.onMessage);
    this.client.on('error', this.onError);
    this.client.on('close', this.onClose);
    this.client.on('disconnect', this.onDisconnect);
  }

  private onConnect(): void {
    console.log('Connected to MQTT broker');
  }

  private onMessage(topic: string, message: Buffer): void {
    console.log('Received message from topic:', topic);
    console.log('Message:', message.toString());
  }

  private onError(error: Error): void {
    console.error('MQTT error:', error);
  }

  private onClose(): void {
    console.log('MQTT connection closed');
  }

  private onDisconnect(): void {
    console.log('MQTT client disconnected');
  }

  public subscribe(topic: string, callback: (topic: string, message: Buffer) => void): void {
    this.client.subscribe(topic, { qos: 0 }, (err, granted) => {
      if (err) {
        console.error('Error while subscribing:', err);
      } else {
        console.log('Subscribed to topic:', topic);
      }
    });

    this.client.on('message', callback);
  }

  public publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  public unsubscribe(topic: string): void {
    this.client.unsubscribe(topic, (err) => {
      if (err) {
        console.error('Error while unsubscribing:', err);
      } else {
        console.log('Unsubscribed from topic:', topic);
      }
    });
  }

  public end(): void {
    this.client.end();
  }
}

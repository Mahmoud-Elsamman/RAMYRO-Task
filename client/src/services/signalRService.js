import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5150/processHub")
  .configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .build();

export const startConnection = async () => {
  try {
    if (connection.state === signalR.HubConnectionState.Disconnected) {
      await connection.start();
      console.log("SignalR Connected");
    }
  } catch (err) {
    console.error("SignalR Connection Error", err);
  }
};

export default connection;

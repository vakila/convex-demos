import { useState } from "react";
import { useAction, useMutation, useQuery } from "../convex/_generated/react";

export default function App() {
  const messages = useQuery("listMessages") || [];

  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation("sendMessage");
  const sendGif = useAction("actions/sendGif");

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
  async function handleSendMessage(event) {
    event.preventDefault();
    setNewMessageText("");
    // If a /giphy command is entered, call the action.
    if (newMessageText.startsWith("/giphy ")) {
      const query = newMessageText.slice(7);
      await sendGif(query, name);
    } else {
      await sendMessage(newMessageText, name, "text");
    }
  }
  return (
    <main>
      <h1>Convex Chat</h1>
      <p className="badge">
        <span>{name}</span>
      </p>
      <ul>
        {messages.map(message => (
          <li key={message._id.toString()}>
            <span>{message.author}:</span>
            {message.format === "giphy" ? (
              <span>
                <iframe src={message.body} />
                <div className="giphy-attribution">Powered By GIPHY</div>
              </span>
            ) : (
              <span>{message.body}</span>
            )}
            <span>{new Date(message._creationTime).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          value={newMessageText}
          onChange={event => setNewMessageText(event.target.value)}
          placeholder="Write a message…"
        />
        <input type="submit" value="Send" disabled={!newMessageText} />
      </form>
    </main>
  );
}

import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import ChatBox from "./ChatBox";

export default function App() {
  const channels = useQuery("listChannels") || [];
  const [channelId, setChannelId] = useState(null);
  const [newChannelName, setNewChannelName] = useState("");
  const addChannel = useMutation("addChannel");
  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));

  async function handleAddChannel(event) {
    event.preventDefault();
    setNewChannelName("");
    const id = await addChannel(newChannelName);
    setChannelId(id);
  }
  return (
    <main>
      <h1>Convex Chat</h1>
      <p className="badge">
        <span>{name}</span>
      </p>
      <div className="main-content">
        <div className="channel-box">
          <ul>
            {channels.map(channel => (
              <li
                key={channel._id.toString()}
                onClick={() => setChannelId(channel._id)}
                style={{
                  fontWeight: channel._id.equals(channelId) ? "bold" : "normal",
                }}
              >
                {channel.name}
              </li>
            ))}
          </ul>
          <form
            onSubmit={handleAddChannel}
            className="d-flex justify-content-center"
          >
            <input
              value={newChannelName}
              onChange={event => setNewChannelName(event.target.value)}
              className="form-control w-50"
              placeholder="Add a channel..."
            />
            <input
              type="submit"
              value="Add"
              className="ms-2 btn btn-primary"
              disabled={!newChannelName}
            />
          </form>
        </div>
        {channelId ? <ChatBox channelId={channelId} name={name} /> : null}
      </div>
    </main>
  );
}

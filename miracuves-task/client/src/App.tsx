import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data", { content: input });
      setInput("");
      fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Miracuves Task Demo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter data"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {data.map((item) => (
          <li key={item._id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

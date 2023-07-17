import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  return (
    <div className="container">
      <Form
        input={input}
        setInput={setInput}
        items={items}
        setItems={setItems}
      />
      <List items={items} setItems={setItems} />
      <TotalAmount items={items} />
    </div>
  );
}

function Form({ input, setInput, setItems, items }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return window.alert("Add an item first!");
    const id = crypto.randomUUID();
    setItems([{ id: id, title: input, completed: false }, ...items]);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="user-input"
        type="text"
        placeholder="Add an item..."
      />
      <button className="submit-btn" type="submit">
        +
      </button>
    </form>
  );
}

function List({ items, setItems }) {
  function handledelete({ id }) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id}>
          {item.title}
          <button onClick={() => handledelete(item)} className="del-btn">
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

function TotalAmount({ items }) {
  return <div className="total">Total items: {items.length}</div>;
}

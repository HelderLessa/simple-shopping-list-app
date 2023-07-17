import { Fragment, useEffect, useState } from "react";

export default function App() {
  const initialState = JSON.parse(localStorage.getItem("list")) || [];
  const [input, setInput] = useState("");
  const [items, setItems] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container">
      <Form
        input={input}
        setInput={setInput}
        items={items}
        setItems={setItems}
      />
      <List items={items} setItems={setItems} />
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
      <button className="submit-btn btn" type="submit">
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
    <Fragment>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handledelete(item)} className="del-btn btn">
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="total">
        <button onClick={() => setItems([])} className="btn clear-btn">
          Clear list
        </button>
        <div>Total items: {items.length}</div>
      </div>
    </Fragment>
  );
}

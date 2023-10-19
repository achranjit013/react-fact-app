import React, { useState } from "react";
import supabase from "./supabase";

export const FactForm = ({ categories, formVisibility, setFacts }) => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCaregory] = useState("");

  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all the input fields are valid
    // if so, update supabase and get new fact object
    if (text && isValidHttpUrl(source) && category) {
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();

      setFacts((facts) => [newFact[0], ...facts]);

      setText("");
      setSource("");
      setCaregory("");
    } else {
      window.alert("Please check your input fields and try again!!!");
    }
  };

  return (
    formVisibility && (
      <form className="fact-form" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength={200}
          placeholder="share a fact with the world..."
          className="input-fact"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span>{200 - text.length}</span>
        <input
          type="text"
          placeholder="trustworthy source..."
          className="input-source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <select
          className="drop-down-option"
          value={category}
          onChange={(e) => setCaregory(e.target.value)}
        >
          <option value="">-- choose category --</option>
          {categories.map((item, i) => (
            <option value={item.name} key={i}>
              {item.name}
            </option>
          ))}
        </select>
        <button className="btn btn-large btn-post">post</button>
      </form>
    )
  );
};

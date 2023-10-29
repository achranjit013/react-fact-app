import React, { useState } from "react";
import supabase from "./supabase";

export const FactList = ({ facts, setFacts, categories, initialMessage }) => {
  const handleVotes = async (votes, rowID, column) => {
    const { data: updatedFacts, error } = await supabase
      .from("facts")
      .update({ [column]: votes + 1 })
      .eq("id", rowID)
      .select();

    setFacts(
      facts.map((item, i) => (item.id === rowID ? updatedFacts[0] : item))
    );
  };

  return (
    <section>
      <ul className="fact-list">
        {initialMessage !== "" ? (
          <p className="message">{initialMessage}</p>
        ) : facts.length === 0 ? (
          <p className="message">
            Sorry, there is no any data for the selected category. Please share
            one to view!!!
          </p>
        ) : (
          facts.map((item, i) => (
            <li className="fact" key={i}>
              <p>
                {item.votesInteresting + item.votesMindblowing <
                item.votesFalse ? (
                  <span className="disputed">[⛔️ DISPUTED]</span>
                ) : (
                  ""
                )}
                {item.text}
                <a href={item.source} target="_blank" className="source">
                  (Source)
                </a>
              </p>
              <span
                className="tag"
                style={{
                  background: categories.find(
                    (cat) => cat.name === item.category
                  ).color,
                }}
              >
                {item.category}
              </span>
              <div className="vote-buttons">
                <button
                  onClick={() =>
                    handleVotes(
                      item.votesInteresting,
                      item.id,
                      "votesInteresting"
                    )
                  }
                >
                  👍 {item.votesInteresting}
                </button>
                <button
                  onClick={() =>
                    handleVotes(
                      item.votesMindblowing,
                      item.id,
                      "votesMindblowing"
                    )
                  }
                >
                  🤯 {item.votesMindblowing}
                </button>
                <button
                  onClick={() =>
                    handleVotes(item.votesFalse, item.id, "votesFalse")
                  }
                >
                  👎 {item.votesFalse}
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

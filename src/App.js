import { useEffect, useState } from "react";
import "./App.css";
import { Category } from "./Category";
import { FactForm } from "./FactForm";
import { FactList } from "./FactList";
import supabase from "./supabase";
import { Loader } from "./Loader";

function App() {
  // const initialFacts = [
  //   {
  //     id: 1,
  //     text: "React is being developed by Meta (formerly facebook)",
  //     source: "https://opensource.fb.com/",
  //     category: "technology",
  //     votesInteresting: 24,
  //     votesMindblowing: 9,
  //     votesFalse: 4,
  //     createdIn: 2021,
  //   },
  //   {
  //     id: 2,
  //     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
  //     source:
  //       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
  //     category: "society",
  //     votesInteresting: 11,
  //     votesMindblowing: 2,
  //     votesFalse: 0,
  //     createdIn: 2019,
  //   },
  //   {
  //     id: 3,
  //     text: "Lisbon is the capital of Portugal",
  //     source: "https://en.wikipedia.org/wiki/Lisbon",
  //     category: "society",
  //     votesInteresting: 8,
  //     votesMindblowing: 3,
  //     votesFalse: 1,
  //     createdIn: 2015,
  //   },
  // ];

  const categories = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];

  const [formVisibility, setFormVisibility] = useState(false);
  const [facts, setFacts] = useState([]);
  const [curretCategory, setCurretCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFacts = async () => {
      setIsLoading(true);

      let query = supabase.from("facts").select("*");

      if (curretCategory !== "All") {
        query = query.eq("category", curretCategory);
      }

      let { data: facts, error } = await query.order("votesInteresting", {
        ascending: false,
      });

      if (!error) {
        setFacts(facts);
      } else {
        window.alert("Sorry, there was a problem while loading the data!!!");
      }
      setIsLoading(false);
    };
    getFacts();
  }, [curretCategory]);

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src="./logo.png" alt="logo" />
          <h1>Today I Learned</h1>
        </div>
        <button
          className="btn btn-large btn-open"
          onClick={() => setFormVisibility((status) => !status)}
        >
          {!formVisibility ? "share a fact" : "close"}
        </button>
      </header>

      {/* user input form */}
      <FactForm
        categories={categories}
        formVisibility={formVisibility}
        setFacts={setFacts}
      />

      <main className="main">
        {/* side-bar / menu buttons */}
        <Category
          categories={categories}
          setCurretCategory={setCurretCategory}
        />

        {/* facts / descriptions list */}
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} categories={categories} />
        )}
      </main>
    </div>
  );
}

export default App;

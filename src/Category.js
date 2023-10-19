import React from "react";

export const Category = ({ categories, setCurretCategory }) => {
  return (
    <aside>
      <ul className="side-menu">
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurretCategory("All")}
          >
            All
          </button>
        </li>

        {categories.map((item, i) => (
          <li className="category" key={i}>
            <button
              className="btn btn-category"
              style={{ background: item.color }}
              onClick={() => setCurretCategory(item.name)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

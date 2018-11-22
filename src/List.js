import React from "react";
import './List.css';

const List = props => {
  const { title, items } = props;
  return (
    <div className="card">
      <h5 className="card-header">{title}</h5>
      <div className="card-body">
          <ul className="list-group">
              {items.map(item => (
                  <li className="list-group-item" key={item.id}>
                      {item.name}
                  </li>
              ))}
          </ul>
      </div>
    </div>
  );
};

export default List;

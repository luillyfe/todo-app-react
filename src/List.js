import React, { Component } from "react";
import "./List.css";

class List extends Component {
  state = {
    newItem: ""
  };

  changeItemHandler = ({ target }) => {
    this.setState({ newItem: target.value });
  };

  addItemHandler = event => {
    event.preventDefault();
    this.props.addItem(this.state.newItem);
    this.setState({ newItem: "" });
  };

  handleRemoveItem = (event, item) => {
    event.stopPropagation();
    this.props.removeItem(item);
  };

  formatTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  handleToggle = (event, id) => {
    event.stopPropagation();
    this.props.toggleItem(id);
  };

  render() {
    let { title, items } = this.props;
    if (!items) {
      items = [];
    }
    const label = title.slice(0, title.length - 1);
    return (
      <div className="card">
        <h5 className="card-header">{this.formatTitle(title)}</h5>
        <div className="card-body">
          <ul className="list-group">
            {items.map(item => (
              <li
                className={`list-group-item ${item.complete ? "complete" : ""}`}
                key={item.id}
                onClick={e => this.handleToggle(e, item.id)}
              >
                {item.name}
                <button
                  className="badge badge-danger badge-pill"
                  onClick={e => this.handleRemoveItem(e, item)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-footer">
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={this.addItemHandler}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder={this.formatTitle(label)}
              value={this.state.newItem}
              onChange={this.changeItemHandler}
              aria-label="Search"
            />
            <button className="btn btn-success my-2 my-sm-0" type="submit">
              Add new {label}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default List;

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
    event.persist();
    event.preventDefault();
      let item = {
      name: this.state.newItem
    };
    if (this.props.title === "todos") {
      item = { ...item, complete: false };
    }
    this.props.store.dispatch(this.props.addItem(item));
    this.setState({ newItem: "" });
  };

  handleRemoveItem = id => {
    this.props.store.dispatch(this.props.removeItem(id));
  };

  formatTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  handleToggle = id => {
    this.props.store.dispatch(this.props.toggleItem(id));
  };

  render() {
    let { title, items } = this.props;
    if (!items) {
      items = [];
    }
    const handleToggle = this.props.toggleItem
      ? this.handleToggle
      : () => null;
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
                onClick={() => handleToggle(item.id)}
              >
                {item.name}
                <button
                  className="badge badge-danger badge-pill"
                  onClick={() => this.handleRemoveItem(item.id)}
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

import React, { Component } from "react";

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search Here for Products..."
            aria-label="search"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">
              <i className="fas fa-search" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

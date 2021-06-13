import React, { Component } from "react";
import UserItem from "./userItem"
export default class UserBox extends Component {
  render() {
    const { users } = this.props;
    return users.map((user) => (
      <UserItem key={user._id} user={user} />
    ));
  }
}

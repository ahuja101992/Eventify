import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "./Users.scss";
import AddVendor from "./AddVendor";
import EditVendor from "./EditVendor";
import UserHome from "./UserHome";
import Report from "./Report";
import axios from "axios";
import ViewUsers from "./ViewUsers";
import GenerateLeads from "./GenerateLeads";

class Users extends Component {
  state = {
    vendorList: [],
    profile: {},
    userList: [],
    sidebarTabs: [
      "Welcome",
      "Add Vendors",
      "View Vendors",
      "View Attendees",
      "Reports",
      "Generate Leads"
    ],
    activeTab: 0
  };

  getVendor() {
    axios
      .get("http://localhost:5000/vendor/" + sessionStorage.getItem("email"))
      .then(response => {
        console.log(response.data.result);
        this.setState({ vendorList: response.data.result });
      });
  }

  getProfile() {
    axios
      .get("http://localhost:5000/profile/" + sessionStorage.getItem("email"))
      .then(response => {
        console.log(response.data.result);
        this.setState({ profile: response.data.result });
      });
  }

  getUsers() {
    axios
      .get("http://localhost:5000/users/" + sessionStorage.getItem("email"))
      .then(response => {
        console.log(response.data.result);
        this.setState({ userList: response.data.result });
      });
  }

  componentDidMount() {
    this.getVendor();
    this.getProfile();
    this.getUsers();
  }

  onSelectNewTab = index => {
    this.setState({ activeTab: index });
  };

  render() {
    let privilegeLevel = sessionStorage.getItem("privileges");
    if (!privilegeLevel) {
      this.props.history.push("/");
    } else if (privilegeLevel == "admin") {
      this.props.history.push("/admin");
    }
    let route;

    let renderSidebarTabs = this.state.sidebarTabs.map((tab, i) => {
      return (
        <button
          className={
            "sidebar-item list-group-item list-group-item-action " +
            (this.state.activeTab == i ? "active" : "")
          }
          key={i}
          onClick={e => this.onSelectNewTab(i)}
        >
          {tab}
        </button>
      );
    });

    switch (this.state.activeTab) {
      case 0:
        route = (
          <UserHome
            profile={this.state.profile}
            onModify={this.componentDidMount.bind(this)}
          />
        );
        break;
      case 1:
        route = <AddVendor onModify={this.componentDidMount.bind(this)} />;
        break;
      case 2:
        route = (
          <EditVendor
            vendorList={this.state.vendorList}
            onModify={this.componentDidMount.bind(this)}
          />
        );
        break;
      case 4:
        route = <Report />;
        break;
      case 3:
        route = (
          <ViewUsers
            userList={this.state.userList}
            onModify={this.componentDidMount.bind(this)}
          />
        );
        break;
      case 5:
        route = <GenerateLeads />;
        break;
      default:
        route = null;
    }

    return (
      <React.Fragment>
        <div className="userhome-wrapper col-md-12 screen-wrapper">
          <div className="card accordion-container flex">
            <div className="col-sm-2 sidebar">{renderSidebarTabs}</div>
            <div className="col-sm-10 sidebar-content">{route}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Users;

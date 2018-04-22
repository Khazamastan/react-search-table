/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import all the third party stuff
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Table from "components/Table"
import contacts from "../../data/contacts.json";
import Pagination from "components/Pagination";
import AppWrapper from "./AppWrapper";
import Input from "components/Input";
import Select from "components/Select";
import _ from "lodash";

class App extends React.Component {
  headers = {
    "number": {
      name: "S/NO",
      width: 5
    },
    "firstname": {
      name: "First Name",
      width: 20
    },
    "lastname": {
      name: "Last Name",
      width: 20
    },
    "email": {
      name: "Email",
      width: 30
    },
    "agency_name": {
      name: "Agency Name",
      width: 20
    }
  };
  PER_PAGE = 50;
  pageCounts = [10, 20, 50, 100];
  constructor(props, context) {
    super(props, context);
    this.state = {
      perPage: this.PER_PAGE,
      currentPage: 0,
      query: '',
      filteredContacts: contacts
    }
  }
  /*filter the items based on search query */
  onChangeQuery = (e) => {
    const query = e.target.value;
    if(query.length === 1)
      this.setState({currentPage : 0});

    this.filterItems(contacts, query);
  }
  /* 
    debounce your search so that it will search only when user stops typing for 300ms;
    @param contacts 
    @param query
  */

  filterItems = _.debounce(function (contacts, query) {
    console.log(query);
    query = query.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
      var exists = Object.keys(contact).some(field => {
        const fieldValue = contact[field];
        if (fieldValue && fieldValue != "NULL" && (fieldValue.toString().toLowerCase().indexOf(query) > -1)) {
          return true; 
        }
      });
      if (exists) {
        return true;
      }
    });
    this.setState({ filteredContacts })

  }, 300)

  /* change no of items page */
  onChangePerPageCount = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const perPage = parseInt(e.nativeEvent.target[index].text);
    this.setState({ perPage });
  }

  /* change page number(or go to the page) */
  onChangePageNumber = currentPage => {
    this.setState({ currentPage: currentPage - 1 });
  }

  render() {
    const { query, currentPage, perPage } = this.state;
    const allContactsCount = contacts.length;
    var { filteredContacts } = this.state;
    const start = currentPage * perPage;
    const end = currentPage * perPage + perPage;
    const noOfPages = Math.round(filteredContacts.length / perPage);
    filteredContacts = filteredContacts.slice(start, end);
    return (
      <AppWrapper>
        <Helmet titleTemplate="%s - The Table Search" defaultTitle="The Table Search">
          <meta name="description" content="The Table Search application" />
        </Helmet>
        <h1>Contacts</h1>
        <Select
          pageCounts={this.pageCounts}
          value={perPage}
          onChange={this.onChangePerPageCount}
        />
        <Input
          type="text"
          placeholder="Search here"
          className="search"
          onChange={this.onChangeQuery}
        />
        <Table contacts={filteredContacts} headers={this.headers} />
        <Pagination
          onChangePage={this.onChangePageNumber}
          count={noOfPages}
          currentPage={currentPage + 1}
        />
      </AppWrapper>
    );
  }
}

export default App;




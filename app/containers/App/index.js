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
import utils from "utils/utils";
import Table from "components/Table"
import contacts from "../../data/contacts.json";
import Pagination from "components/Pagination";
import AppWrapper from "./AppWrapper";

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
  constructor(props, context) {
    super(props, context);
    this.state = {
      perPage: this.PER_PAGE,
      currentPage: 0,
      query: '',
      filteredContacts: contacts
    }
  }
  pageCounts = [10, 20, 50, 100];
  onChange = (e) => {
    const query = e.target.value;
    this.setState({ query }, () => {
      utils.debounce(this.filterItems(contacts, query), 1000);
    })
  }
  /* @param contacts 
    @param query
  */
  filterItems(contacts, query) {
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

  }
  onChangePerPageCount = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const perPage = parseInt(e.nativeEvent.target[index].text);
    this.setState({ perPage });
  }
  onChangePageNumber = currentPage => {
    this.setState({ currentPage: currentPage - 1 });
  }
  render() {
    const { query, currentPage, perPage } = this.state;
    var { filteredContacts } = this.state;
    const start = currentPage * perPage;
    const end = currentPage * perPage + perPage;
    const noOfPages = Math.round(filteredContacts.length / perPage);
    filteredContacts = filteredContacts.slice(start, end);
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - The Audio DB"
          defaultTitle="The Audio DB"
        >
          <meta name="description" content="A The Audio DB application" /> 
        </Helmet>
        <select value={perPage} className="perPage" onChange={this.onChangePerPageCount}>
          {
            this.pageCounts.map(pageCount => <option key={pageCount} value={pageCount}>{pageCount}</option>)
          }
        </select>
        <input
          type="text"
          placeholder="Search here"
          className="search"
          value={query}
          onChange={this.onChange}
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

export default  App;




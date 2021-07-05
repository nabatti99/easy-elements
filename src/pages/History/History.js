import { Component } from "react";

import classes from "./History.module.scss";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

import HistoryHeader from "./HistoryHeader/HistoryHeader";
import HistoryMusic from "./HistoryMusic/HistoryMusic";
import Loading from "../../components/UI/Loading/Loading";
import SadFace from "../../components/UI/SadFace/SadFace";

import { getMoreMusics } from "../../utilities/url";
import * as statusText from "./statusText";

class History extends Component {

  state = {
    loading: true,
    error: false,

    filterBy: statusText.ORDER_BY_DATE,
    lastData: null,
    canContinue: true,
    idsList: []
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.initFilter(this.state.filterBy);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  initFilter = (filterBy) => {
    getMoreMusics(5, filterBy)
    .then(response => {
      console.log(response);
      this.setState({
        lastData: response.lastData,
        idsList: response.data,

        loading: false,
        error: null,
        canContinue: response.canContinued
      });
    })
    .catch(error => {
      console.error(error);
      this.setState({
        loading: false,
        error: error.message
      });
    });
  }

  handleChangedSelect = (event) => {
    const selectElement = event.target;

    this.setState({ filterBy: selectElement.value, loading: true });
    this.initFilter(selectElement.value);
  }

  handleScrollBottom = () => {

    if (this.state.loading)
      return;

    this.setState({ loading: true });

    getMoreMusics(5, this.state.filterBy, this.state.lastData)
    .then(response => {
      console.log(response);
      this.setState({
        lastData: response.lastData,
        idsList: [...this.state.idsList, ...response.data],

        loading: false,
        error: null,
        canContinue: response.canContinued
      });
    })
    .catch(error => {
      console.error(error);
      this.setState({
        loading: false,
        error: error.message
      });
    });
  }

  render () {

    let pageContain = null;

    if (this.state.loading && this.state.idsList.length === 0)
      pageContain = (
        <div className="mt-5 pt-5">
          <Loading 
            loadingColor="dark"
            textColor="dark" >{ this.state.message }</Loading>
        </div>
      );
    else
      if (this.state.error)
        pageContain = <SadFace 
          iconSize={1} 
          faceColor="gray" 
          textColor="gray" >{ this.state.error }</SadFace>;
      else
        pageContain = (
          <div className="row flex-column">
            <div className="col-auto p-0 mb-3">
              <HistoryHeader filterBy={ this.state.filterBy } changed={ this.handleChangedSelect } />
            </div>
            <div className="col-auto p-0">
              <HistoryMusic idsList={ this.state.idsList } scrolledBottom={ this.handleScrollBottom } activeScrollHandler={ this.state.canContinue } />
            </div>
          </div>
        );

    return (
      <ErrorBoundary>

        <div className={ classes.Background }>
          <div className="container-fluid">
            { pageContain }
          </div>
        </div>

      </ErrorBoundary>
    );
  }
}

export default History;
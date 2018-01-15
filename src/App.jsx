import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiUrl = 'https://jsonplaceholder.typicode.com/albums';

    this.state = {
      data: [],
      totalCount: 0
    }
    this.updateIncrementHandler = this.updateIncrementHandler.bind(this);

  }
  updateIncrementHandler(itemData, isIncremnt) {
    let found = false;
    let dataCopy = this.state.data;
    let dataLength = dataCopy.length;
    for (let index = 0; index < dataLength && found === false; index++) {
      if (itemData.id === dataCopy[index].id) {
        let totalCountCopy = this.state.totalCount;
        if (dataCopy[index].selectedCount === undefined) {
          dataCopy[index].selectedCount = 1;
          this.setState({ totalCount: ++totalCountCopy });
        } else {
          if (isIncremnt) {
            ++dataCopy[index].selectedCount;
            this.setState({ totalCount: ++totalCountCopy });

          } else {
            this.setState({ totalCount: --totalCountCopy });
            --dataCopy[index].selectedCount;
          }
        }
        found = true;
      }
    }
    this.setState({ data: dataCopy });
  }
  componentDidMount() {
    fetch(this.apiUrl)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ data: data });
      })
  }
  render() {
    return (
      <div className="App">
        <nav class="nav justify-content-end">
          <button type="button" class="btn btn-primary">
            Total Added <span class="badge badge-light"> {this.state.totalCount}</span>
          </button>

        </nav>
        <div className="row">
          {this.state.data.map((dynamicComponent, i) => <Item
            key={i}
            componentData={dynamicComponent}
            updateIncrementHandler={this.updateIncrementHandler}
          />)}
        </div>
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCount: this.props.selectedCount === undefined ? 0 : this.props.selectedCount
    }
    this.decrementHandler = this.decrementHandler.bind(this);
  }
  componentDidMount() {

  }
  decrementHandler(itemData, isIncremnt) {
    let selectedCountCopy = this.state.selectedCount; 
    if (isIncremnt) {
      this.setState({ selectedCount: ++selectedCountCopy });
    } else {
      if (this.state.selectedCount > 0) {
        this.setState({ selectedCount: --selectedCountCopy });
      }

    }
    if (this.state.selectedCount >= 0) {
      this.props.updateIncrementHandler(itemData, isIncremnt);
    }
  }
  render() {
    return (
      <div className="col-sm">
        <div className="card-body">
          <h5 className="card-title">{this.props.componentData.title}</h5>
          <span> Price : {this.props.componentData.id} </span>
          <br />
          <button onClick={() => this.decrementHandler(this.props.componentData, true)}
            className="btn btn-primary">+</button>
          {this.state.selectedCount}
          <button disabled={this.state.selectedCount === 0} onClick={() => this.decrementHandler(this.props.componentData, false)}
            className="btn btn-primary">-</button>
        </div>
      </div>
    );
  }
}


export default App;

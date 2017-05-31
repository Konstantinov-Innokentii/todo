import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {text: '' ,};
    }

    handleChange(e) {
        this.setState({text: e.target.value});
        console.log("CHANGED");
    }
    handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/v1/note', {
        content: this.state.text,
         }).then(function (response) {
             this.props.onItemAdded(response.data)
             console.log(response);
         }).catch(function (error) {console.log(error);});
    console.log("SUBMITTED")
    }
    del(id){
        console.log("deleted"+id);
        axios.delete('api/v1/note/'+id).then(function (response) {
                console.log(response);
            }).
        catch(function (error) {console.log(error);});
    }
    mark_done(id){
        axios.put('api/v1/note/'+id).then(function (response) {
                console.log(response);
            }).
        catch(function (error) {console.log(error);});
    }

    render() {

      var todoEntries = this.props.items;
      var listItems = todoEntries.map(item => (
            <div className="element">
                <li key={item.id}>
                    <textarea className={item.done ? "done" : ""} disabled={item.done} key={item.id} value={item.content}/>
                    <button type="button" onClick={() => this.del(item.id)}>del</button>
                    <button type="button">done</button>
                </li>
            </div>
      ));
      return (
          <div>
              <h3>TODO</h3>
              <div className="todoItems">
                  <ul className="theList">
                      {listItems}
                  </ul></div>
              <form onSubmit={this.handleSubmit}>
                  <input onChange={this.handleChange} value={this.state.text} />
                  <button>{'Add #' + (this.props.items.length + 1)}</button>
              </form>
          </div>

    );
  }
}

class App extends Component {

    constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: []};
  }

  componentDidMount(){
        console.log("App mounted");
        axios.get("/api/v1/note").then(r => this.setState({items:r.data}));
        console.log("did get")
    }

  render() {
    return (
      <div>
        <TodoList items={this.state.items} onItemAdded={(item) => this.setState({items: this.state.items.concat([item])})} />
      </div>
    );
  }

  // handleChange(e) {
  //   this.setState({text: e.target.value});
  //   console.log("CHANGED");
  // }
  //(item) => this.setState({items: this.state.items.concat([item])})
  // handleSubmit(e) {
  //   e.preventDefault();
  //   axios.post('/api/v1/note', {
  //            content: this.state.text,
  //        })
  //            .then(function (response) {
  //                console.log(response);
  //                var newItem = {
  //                    text: response.data.content,
  //                    id: response.data.id
  //                };
  //                this.setState((prevState) => ({
  //                    items: prevState.items.concat(newItem),
  //                    text: ''
  //                }));
  //            }).
  //        catch(function (error) {console.log(error);});
  //   // var newItem = {
  //   //   text: this.state.text,
  //   //   id: Date.now()
  //   // };
  //   // this.setState((prevState) => ({
  //   //   items: prevState.items.concat(newItem),
  //   //   text: ''
  //   // }));
  //   console.log("SUBMITTED")
  // }
}

export default App;
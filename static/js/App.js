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
        done : false
         }).then(function (response) {
             this.props.onItemAdded(response.data);
         }.bind(this)).catch(function (error) {console.log(error);});
    console.log("SUBMITTED")
    }

    del(id){
        console.log("deleted"+id);
        axios.delete('api/v1/note/'+id).then(function (response) {
            var remainder = this.props.items.filter((item) =>{
                if (item.id !==id) return item; });
            this.props.onItemDeleted(remainder);
            }.bind(this)).
        catch(function (error) {console.log(error);});
    }

    mark_done(id,done,content){
        axios.put('/api/v1/note/'+id, {
            content: content,
            done: !done,
            id: id
         }).then(function (response) {
             var remainder = this.props.items.filter((item) =>{
                if (item.id  !==id)  return item; });
             console.log(remainder);
             remainder = remainder.concat(response.data);
             console.log(remainder);
             this.props.onItemDoned(remainder);
             console.log(response);
         }.bind(this)).catch(function (error) {console.log(error);});
    }

    render() {

      var todoEntries = this.props.items;
      var listItems = todoEntries.map(item => (
            <div className="element">
                <li key={item.id}>
                    <textarea className={item.done ? "done" : ""} disabled={item.done} key={item.id} value={item.content}/>
                    <button type="button" onClick={() => this.del(item.id)}>del</button>
                    <button type="button" onClick={() =>this.mark_done(item.id,item.done,item.content)}>done</button>
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
        <TodoList items={this.state.items}
                  onItemAdded={(item) => this.setState({items: this.state.items.concat([item])})}
                  onItemDeleted = {(remainder) => this.setState({items: remainder})}
                  onItemDoned  = {(remainder) => this.setState({items: remainder})}
        />
      </div>
    );
  }

}

export default App;
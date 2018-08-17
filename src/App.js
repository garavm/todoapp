import React, { Component } from 'react';

class ToDoItems extends Component {

  toDo = () => {
    const { item, action } = this.props;
    action(item);
  }

  render() {
    const { item } = this.props;
    return <li class={item.isDone ? "is-done" : ""}
      key={item.id} onClick={this.toDo}>{item.itemName}</li>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: [],
      remingItem: 0
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    const { items, value } = this.state;


    let doneItem = this.state.items.filter(val => {
      return val.isDone === true;
    }).length;


    this.setState({
      items: [...items, {
        id: items.length + 1,
        itemName: value, isDone: false
      }],
      remingItem: items.length - doneItem + 1
    })
    event.preventDefault();
  };



  _remainingItem = () => {
    let doneItem = this.state.items.filter(val => {
      return val.isDone === true;
    }).length;
    this.setState({ remingItem: this.state.items.length - doneItem })
  };


  handleListItem = (item) => {
    const { items } = this.state;
    const objIndex = items.findIndex((obj => obj.id === item.id));
    let newitem = { ...items[objIndex] };
    newitem.isDone = !item.isDone;
    items[objIndex] = newitem;
    this.setState({ items }, () => {
      this._remainingItem();
    })
  };


  render() {
    return (
      <div>
        <div>
          <h2>
            Todo List
                    </h2>

          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Add" />
          </form>

          <p> {this.state.remingItem} remaining out of {this.state.items.length} tasks</p>

          <ul>
            {
              this.state.items.map((item) => {
                return (
                  <ToDoItems item={item} key={item.id} action={this.handleListItem} />
                );
              })
            }

          </ul>
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
      </div>
    );
  }
}





export default App;



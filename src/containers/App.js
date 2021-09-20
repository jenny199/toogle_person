import React, { Component } from 'react';
import styled from 'styled-components';
import classes from './App.css';
import Persons from '../components/Persons/persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';
 
class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }
  state = {
    persons:[
      {id:"gh1",name:"Jenny", age: 24},
      {id:"gh2",name:"Manzi", age : 26}
    ],
    showPersons:false,
    showCockpit:true,
    authenticated: false,
  };
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;

  }
  componentDidMount(){
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState( {persons:persons} )
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons;
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPertoggleBtnRefsons;
    this.setState({showPersons: !doesShow})
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render() {
    console.log('[App.js] render');
    let  persons = null;

    if (this.state.showPersons) {
      persons = <Persons
      persons={this.state.persons}
      clicked={this.deletePersonHandler}
      changed={this.nameChangedHandler} 
      isAuthenticated={this.state.authenticated}
    />;
    }
    
    return (
      <Aux classes= {classes.App} >
        <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
        <AuthContext.Provider 
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
            }}
        >
        {this.state.showCockpit ?(<Cockpit 
          title = {this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
          />
          ) :null}
        {persons} 
        </AuthContext.Provider>
           

      </Aux>

    );
  }
}

export default withClass(App,classes.App);

import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
//import routes from './routes';
import Students from './components/Students';

class App extends Component 
{
  constructor()
  {
    super();

    this.state =
    {
      students: []
    }
  }
  
  componentDidMount()
  {
    axios.get('/students').then(res =>
    {
      this.setState({ students: res.data });
    });
  }

  render() 
  {
    let students = this.state.students.map((e,i) => 
    {
      return (
        <Students key={e.id}
          name={e.student}
          email={e.email_address}
          phone={e.phone}
          grade={e.current_grade}
        />
      )
    })
    return (
      <div className="App">
        {/* <Link to='/login'>Login</Link>
        <Link to='/students'>StudentList</Link> */}

        {/* {routes} */}

        {students}
      </div>
    );
  }
}

export default App;

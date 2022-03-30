import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

type AppProps = {
  persons: {
    name: string;
    birthday: Date;
  }[];
}

class App extends Component<AppProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Birthdays</h1>
        <p>
          <PersonList persons={this.props.persons} />
        </p>
      </div>
    );
  }
}

function GetThisYearsDate(props: { name?: string; birthday: Date; })
{
  var now = new Date();
  const dob = props.birthday;

  return (<td>
    {dob.toString('dd/MM')}/{now.getFullYear()}
    </td>);
}

class PersonList extends Component<AppProps> {
  constructor(props) {
    super(props);
  }
  
  render() {
        return (
          <table>
            {this.props.persons.map((person) => 
              <tr>
                <td>{person.name}</td>
                <td>{GetThisYearsDate(person)}</td>
              </tr>
            )}
          </table>
        );
  };
}

const personList = [
  { name: "Kristoffer Hansen", birthday: new Date("1980-09-03")},
  { name: "Mikkel Hansen", birthday: new Date("1978-07-18")},
  { name: "Storm Hansen", birthday: new Date("2010-08-02")},
  { name: "Gunnar Hansen", birthday: new Date("1947-07-08")},
  { name: "Kamma Hansen", birthday: new Date("1950-10-10")},
  { name: "Ann-Mai Hansen", birthday: new Date("1983-11-07")},
  { name: "Erling Hansen", birthday: new Date("1941-08-15")}
];

render(<App persons={personList}/>, document.getElementById('root'));
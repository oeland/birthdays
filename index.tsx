import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { format, differenceInDays } from 'date-fns';

type Person = {
  name: string;
  birthdate: Date;
};

type Persons = Person[];

type AppProps = {
  family: Persons;
  friends: Persons;
};

class App extends Component<AppProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Birthdays</h1>
        <p>
          <PersonList people={this.props.family} />
        </p>
        <p>
          <PersonList people={this.props.friends} />
        </p>
      </div>
    );
  }
}

function GetThisYearsBirthdate(props: Person) {
  var now = new Date();
  const dob = props.birthdate;

  return format(dob, 'dd/MM') + '/' + now.getFullYear();
}

function GetDaysUntilBirthday(props: Person) {
  var now = new Date();
  var birthday = new Date(
    now.getFullYear(),
    props.birthdate.getMonth(),
    props.birthdate.getDate()
  );
  var birthdayNextYear = new Date(
    now.getFullYear() + 1,
    props.birthdate.getMonth(),
    props.birthdate.getDate()
  );

  var rawDifference = differenceInDays(birthday, now);
  var difference = 0;
  if (rawDifference > -1) {
    difference = rawDifference;
  } else {
    difference = differenceInDays(birthdayNextYear, now);
  }

  console.log(birthday, birthdayNextYear, difference, rawDifference);

  return difference;
}

class PersonList extends Component<Persons> {
  render() {
    return (
      <table>
        <tr>
          <th>Name</th>
          <th>Born</th>
          <th>Days to birthday</th>
        </tr>
        {this.props.people.map((p) => (
          <tr>
            <td>{p.name}</td>
            <td>{GetThisYearsBirthdate(p)}</td>
            <td>{GetDaysUntilBirthday(p)}</td>
          </tr>
        ))}
      </table>
    );
  }
}

const familyList: Persons = [
  { name: 'Kristoffer Hansen', birthdate: new Date('1980-09-03') },
  { name: 'Mikkel Hansen', birthdate: new Date('1978-07-18') },
  { name: 'Storm Hansen', birthdate: new Date('2010-08-02') },
  { name: 'Gunnar Hansen', birthdate: new Date('1947-07-08') },
  { name: 'Kamma Hansen', birthdate: new Date('1950-10-10') },
  { name: 'Ann-Mai Hansen', birthdate: new Date('1983-11-07') },
  { name: 'Erling Hansen', birthdate: new Date('1941-08-15') },
];

const friendsList: Persons = [
  { name: 'Rene Christensen', birthdate: new Date('1980-09-03') },
  { name: 'Mikkel Hansen', birthdate: new Date('1979-02-02') },
  { name: 'Mark Herdal', birthdate: new Date('1978-03-20') },
  { name: 'Lars Lauritzen', birthdate: new Date('1975-12-17') },
  { name: 'Jonas Christensen', birthdate: new Date('1979-11-22') },
  { name: 'Thomas Hansen', birthdate: new Date('1978-11-04') },
];

render(
  <App family={familyList} friends={friendsList} />,
  document.getElementById('root')
);

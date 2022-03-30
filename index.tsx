import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  differenceInDays,
} from 'date-fns';

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

function GetThisYearsBirthdate(props: { name?: string; birthday: Date }) {
  var now = new Date();
  const dob = props.birthday;

  return format(dob, 'dd/MM') + '/' + now.getFullYear();
}

function GetDaysUntilBirthday(props: { name?: string; birthday: Date }) {
  var now = new Date();
  var birthday = new Date(
    now.getFullYear(),
    props.birthday.getMonth(),
    props.birthday.getDate()
  );
  var birthdayNextYear = new Date(
    now.getFullYear() + 1,
    props.birthday.getMonth(),
    props.birthday.getDate()
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
  constructor(people: Persons) {
    super(people);
  }

  render() {
    return (
      <table>
        <tr>
          <th>Name</th>
          <th>Born</th>
          <th>Days to birthday</th>
        </tr>
        {this.props.people.map((person) => (
          <tr>
            <td>{person.name}</td>
            <td>{GetThisYearsBirthdate(person)}</td>
            <td>{GetDaysUntilBirthday(person)}</td>
          </tr>
        ))}
      </table>
    );
  }
}

const familyList = [
  { name: 'Kristoffer Hansen', birthday: new Date('1980-09-03') },
  { name: 'Mikkel Hansen', birthday: new Date('1978-07-18') },
  { name: 'Storm Hansen', birthday: new Date('2010-08-02') },
  { name: 'Gunnar Hansen', birthday: new Date('1947-07-08') },
  { name: 'Kamma Hansen', birthday: new Date('1950-10-10') },
  { name: 'Ann-Mai Hansen', birthday: new Date('1983-11-07') },
  { name: 'Erling Hansen', birthday: new Date('1941-08-15') },
];

const friendsList = [
  { name: 'Rene Christensen', birthday: new Date('1980-09-03') },
  { name: 'Mikkel Hansen', birthday: new Date('1979-02-02') },
  { name: 'Mark Herdal', birthday: new Date('1978-03-20') },
  { name: 'Lars Lauritzen', birthday: new Date('1975-12-17') },
  { name: 'Jonas Christensen', birthday: new Date('1979-11-22') },
  { name: 'Thomas Hansen', birthday: new Date('1978-11-04') },
];

render(
  <App family={familyList} friends={friendsList} />,
  document.getElementById('root')
);

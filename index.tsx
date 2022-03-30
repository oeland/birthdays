import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import {
  format,
  differenceInDays,
  differenceInYears,
  compareDesc,
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

  componentDidMount() {
    setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
}

function GetNextBirthday(props: Person) {
  const dob = props.birthdate;
  const now = new Date();
  const birthDayCurrentYear = new Date(
    now.getFullYear(),
    dob.getMonth(),
    dob.getDate()
  );
  var addYear = 0;
  if (compareDesc(birthDayCurrentYear, now) > 0) addYear++;

  return new Date(now.getFullYear() + addYear, dob.getMonth(), dob.getDate());
}

function GetDaysUntilBirthday(props: Person) {
  const now = new Date();
  const nextBirthDay = GetNextBirthday(props);

  console.log(now, nextBirthDay);

  return differenceInDays(nextBirthDay, now) + 1;
}

function GetAge(props: Person) {
  const now = new Date();

  return differenceInYears(now, props.birthdate);
}

class PersonList extends Component<Persons> {
  render() {
    return (
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Next birthday</th>
          <th>Days to next birthday</th>
        </tr>
        {this.props.people.map((p) => (
          <tr>
            <td>{p.name}</td>
            <td>{GetAge(p)}</td>
            <td title={'Born ' + format(p.birthdate, 'dd-MM-yyyy')}>
              {format(GetNextBirthday(p), 'dd-MM-yyyy')}
            </td>
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
  { name: 'Rene Christensen', birthdate: new Date('1979-02-02') },
  { name: 'Mark Herdal', birthdate: new Date('1978-03-20') },
  { name: 'Lars Lauritzen', birthdate: new Date('1975-12-17') },
  { name: 'Jonas Christensen', birthdate: new Date('1979-11-22') },
  { name: 'Thomas Hansen', birthdate: new Date('1978-11-04') },
];

render(
  <App family={familyList} friends={friendsList} />,
  document.getElementById('root')
);

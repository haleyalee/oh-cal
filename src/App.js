import React from 'react';
import './App.css';
import ical2json from 'ical2json';
import './App.css';
import icon from './icon.png'
import logo1 from './logo1.png';
import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/auth';
import Login from './Login';

firebase.initializeApp({
  "projectId": "ohrcal",
  "appId": "1:926561314986:web:c081971f837568156d08d3",
  "databaseURL": "https://ohrcal.firebaseio.com",
  "storageBucket": "ohrcal.appspot.com",
  "locationId": "us-east4",
  "apiKey": "AIzaSyDR4TNHkOorcOA8DoUx-zgXDyXEFt7C0Ls",
  "authDomain": "ohrcal.firebaseapp.com",
  "messagingSenderId": "926561314986"
});

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
      currentUser: firebase.auth().currentUser
    }

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.state = {
          currentUser: firebase.auth().currentUser
        }
      }
    })
  }

  componentWillUpdate() {
    $(document).ready(function () {
      $(".dropdown").hover(function () { //When trigger is hovered...
        $(".dropdown-content").show();
      }, function () {
        $(".dropdown-content").hide();
      })
    });
  }

  componentDidMount() {
    $(document).ready(function () {
      $(".dropdown").hover(function () { //When trigger is hovered...
        $(".dropdown-content").show();
      }, function () {
        $(".dropdown-content").hide();
      })
    });
  }

  setUser = (user) => {
    this.setState({ currentUser: user })
  }

  getJson = () => {
    fetch('/icsToJSON', { method: 'GET' })
      .then(res => res.text()).then(
        text => this.setState({ text })
      );
  }

  handleFileRead = (e) => {
    const text = e.target.result;
    this.setState({ text });
    this.setState({
      json: ical2json.convert(text)
    });
    console.log(this.state.json);
  }

  handleChange = (e) => {
    const file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(file);
  }

  generateTable = () => {
    let list = [];
    for (let i = 0; i < 16; i++) {
      list.push(i);
    }
    let list2 = [0, 0, 0, 0, 0, 0, 0];
    return list.map(i => {
      const time = (i + 6) % 12 + 1
      const time2 = time % 12 + 1;
      return (<tr>
        <th style={{ "text-align": "left" }}> {time}-{time2} {(i + 7) >= 12 && 'PM'} {(i + 7) < 12 && 'AM'} </th>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
      </tr >);
    })
  }

  render() {
    return (
      <div>

        {firebase.auth().currentUser &&
          <div>
            <meta charSet="utf-8" />
            <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet" />
            <style dangerouslySetInnerHTML={{ __html: "\n      body{\n        color:#fff;\n        font-family: 'Ubuntu', serif;\n        font-size:40px;\n      }\n      .main-container{\n        max-width:100%;\n        margin:0 auto;\n        padding:0px;\n        margin-top:0px;\n        padding:0px;\n        background:#FFF;\n        margin-top:0px;\n      }\n      .main-header{\n        position:-webkit-sticky;\n        position:sticky;\n        top:0;\n        height:100px;\n        background:#FFF;\n        color: black;      }\n      .main-content{\n      }\n      .menu-button{\n        background:#FFF;\n        height:50px\n        background:url(icon.png) no-repeat;\n        position:relative;\n        border: none;\n        float:right;\n      }\n      .dropdown{\n        float:right;\n        content: \"\";\n        margin: 30px 20px;\n        display: inline-block;\n        background-color: #fff;\n      }\n      .dropdown-content{\n        margin-top: 50px;\n        display:none;\n        /*margin: 5px 10px;*/\n        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n        z-index: 1;\n      }\n      .dropdown-content a {\n        color: black;\n        padding: 12px 16px;\n        margin-right: 20px;\n        text-decoration: none;\n        display: block;\n      }\n      " }} />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <main className="main-container">
              <header className="main-header">
                <img src={logo1} style={{ height: '100px', width: 'auto' }} />
                <div className="dropdown">
                  <button className="menu-button" type="button" data-toggle="dropdown">
                    <img src={icon} style={{ width: '50px', background: '#FFF' }} />
                  </button>
                  <div className="dropdown-content">
                    <a>FAQ</a>
                    <a>Settings</a>
                    <a>Log out</a>
                  </div>
                </div>
              </header>
              <div className="main-content" style={{ fontFamily: '"Ubuntu"' }}>
                <div className="calendar">
                  <table>
                    <tr>
                      <th></th>
                      <th>Su</th>
                      <th>M</th>
                      <th>Tu</th>
                      <th>W</th>
                      <th>Th</th>
                      <th>F</th>
                      <th>Sa</th>
                    </tr>
                    {this.generateTable()}
                  </table>
                </div>
              </div>
              <div id="sidebar">
                <div class="bigredbutton">Add</div>
                <div class="bigredbutton">Download</div>
                <div id="search">
                  <input type="text" class="shadow" placeholder="search for a course" />

                  <div class="course-list">
                    <a>ECE 2100</a>
                    <a>ECE 2200</a>
                    <a>ECE 2300</a>
                    <a>CS 2110</a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        }
        {!firebase.auth().currentUser && <Login setUser={this.setUser} />}
      </div>
    );
  }
}

export default App;

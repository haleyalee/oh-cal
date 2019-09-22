import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';

class Login extends React.Component {

  login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const setUser = this.props.setUser;
    if (!firebase.auth().currentUser) {
      firebase.auth().signInWithRedirect(provider).then(function (result) {
        setUser(result);
      })
    }
    setUser(firebase.auth().currentUser);
  }

  render() {
    return (
      <div>
        <center>
          <button onClick={() => this.login()}> Login </button>
        </center>
      </div>
    );
  }
}

export default Login; 
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Form, Button } from 'native-base';
import { Facebook } from "expo";
import * as firebase from "firebase";


var config = {
  apiKey: "AIzaSyC3tlY83AddAmYcvblGfmCuEdPKZ18TzwA",
  authDomain: "reservaturnos-cdc8a.firebaseapp.com",
  databaseURL: "https://reservaturnos-cdc8a.firebaseio.com",
  projectId: "reservaturnos-cdc8a",
  storageBucket: "reservaturnos-cdc8a.appspot.com",
  messagingSenderId: "565297411849"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  render() {
    return (
      <Container style={styles.container} >
        <Form>
          <Button full rounded onPress={this.Facebooklogin}>
            <Text>SignIn</Text>
          </Button>
        </Form>
      </Container>
    );
  }

  async Facebooklogin() {
    const { type, token } = await
      Facebook.logInWithReadPermissionsAsync(
        "1926264377479120", {
          permission: "public_profile"
        }
      );

    if (type == "success") {
      console.log("1");
      const credential =
        firebase
          .auth
          .FacebookAuthProvider
          .credential(token);
          console.log("2");
    firebase
      .auth().signInAndRetrieveDataWithCredential(credential).catch(error => {
        console.log(error);
      });
    }
    
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
          console.log(user);
      }
    });
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});

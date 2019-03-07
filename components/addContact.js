import React from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { Grid, Col, Label, Content, Button, Item, Input, Text, Form } from 'native-base';

class addContact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataContact: {
                firstName: "",
                lastName: "",
                age: "",
                photo: ""
              },
            isLoading: false,
        }
    }

    // styling header
    static navigationOptions = {
        title: "Add Contact",
        headerStyle: {
            backgroundColor: "purple"
        },
        headerTintColor: "white"
    }
    // note: photo yang dikirim berupa url online karena by default API.
    // fungsi untuk add contact
    addContact = () => {
        console.log(this.state.dataContact)
        var url = "https://simple-contact-crud.herokuapp.com/contact";
        axios.post(url, this.state.dataContact)
        .then((x) => {
            Alert.alert("Successfully!")
            
            // buat auto redirect ke halaman utama, setelah data berhasil ditambahkan
            this.props.navigation.push("Contacts")
        })
        .catch((err) => {
            Alert.alert("Failed!")
        })
    }

    render() {
        return (
          <Content>
            <Form>
              <Grid>
                <Col style={{margin:15}}>
                  <Item floatingLabel>
                    <Label>First Name</Label>
                    <Input
                      onChangeText={(e) => {
                          let dataContactCopy = this.state.dataContact;
                          dataContactCopy.firstName = e
                          this.setState({
                              dataContact: dataContactCopy
                          })
                      }}
                    />
                  </Item>
                </Col>
                <Col style={{margin:15}}>
                  <Item floatingLabel>
                    <Label>Last Name</Label>
                    <Input
                      onChangeText={(e) => {
                          let dataContactCopy = this.state.dataContact;
                          dataContactCopy.lastName = e
                          this.setState({
                              dataContact: dataContactCopy
                          })
                      }}
                    />
                  </Item>
                </Col>
              </Grid>
              <Grid>  
                <Col style={{margin:15}}>
                  <Item floatingLabel>
                    <Label>Age</Label>
                    <Input
                      onChangeText={(e) => {
                          let dataContactCopy = this.state.dataContact;
                          dataContactCopy.age = e
                          this.setState({
                              dataContact: dataContactCopy
                          })
                      }}
                    />
                  </Item>
                </Col>
                <Col style={{margin:15}}>
                  <Item floatingLabel>
                    <Label>Photo URL</Label>
                    <Input
                      onChangeText={(e) => {
                          let dataContactCopy = this.state.dataContact;
                          dataContactCopy.photo = e
                          this.setState({
                              dataContact: dataContactCopy
                          })
                      }}
                    />
                  </Item>
                </Col>
              </Grid>
            </Form>

            <Button primary full style={{margin:15}} onPress={this.addContact}
              
            >
              <Text>Add Contact</Text>
            </Button>
          </Content>
        )
    }
}

export default addContact;


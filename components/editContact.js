import React from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import {Grid, Col, Label, Form, Content, Button, Item, Input, Text } from 'native-base';

class editContact extends React.Component {

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

            // ambil data yang dilempar dari halaman Contacts, untuk di edit sesuai dengan yg user pilih
            id: this.props.navigation.getParam("id"),
            firstName: this.props.navigation.getParam("firstName"),
            lastName: this.props.navigation.getParam("lastName"),
            age: this.props.navigation.getParam("age"),
            photo: this.props.navigation.getParam("photo")
        }
    }


    // styling header
    static navigationOptions = {
        title: "Edit Contact",
        headerStyle: {
            backgroundColor: "purple"
        },
        headerTintColor: "white"
    }

    // note : fungsi updateContact ini akan jalan jika fungsi PUT by ID di dokumentasi bisa jalan, 
    // karna beberapa kali Saya coba fungsi PUT by ID di dokumentasi >> https://simple-contact-crud.herokuapp.com/documentation#!/contact/deleteContactId fungsinya tidak jalan. 
    // maybe something wrong dengan api nya, or maybe protected. Dan Saya juga tidak bisa melakukan pengecekan problemnya. karna itu data dummy dari contact API heroku. Thank you :) 

    // untuk edit contact by id yg dipilih
    updateContact = () => {

        // untuk cek data id yg di edit sesuai 
        // Alert.alert(this.state.id)

        axios.put(`https://simple-contact-crud.herokuapp.com/contact/${this.state.id}`, this.state.dataContact)
        .then(() => {
            Alert.alert("Contact updated!")

            // buat auto redirect ke halaman utama, setelah data berhasil ditambahkan
            this.props.navigation.push("Contacts")
        })
        .catch((err) => {
            Alert.alert("Update failed!")
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
                              dataContact: dataContactCopy,
                              firstName: e
                          })
                      }}
                      value={this.state.firstName}
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
                              dataContact: dataContactCopy,
                              lastName: e
                          })
                      }}
                      value={this.state.lastName}
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
                              dataContact: dataContactCopy,
                              age: e
                          })
                      }}              
                      // toString buat ngerubah value integer ke string, karna expected valuenya string
                      value={this.state.age.toString()}
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
                              dataContact: dataContactCopy,
                              photo: e
                          })
                      }}
                      value={this.state.photo}
                    />
                  </Item>
                </Col>
              </Grid>
            </Form>

            <Button primary full style={{margin:15}} onPress={this.updateContact}>
              <Text>Update Contact</Text>
            </Button>
          </Content>
        )
    }
}

export default editContact;


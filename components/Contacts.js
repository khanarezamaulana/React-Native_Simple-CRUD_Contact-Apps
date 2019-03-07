import React from 'react';
import axios from 'axios';
import { Alert, ScrollView } from 'react-native';
import { Container, Left, Body, Right, Icon, Button, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';

class Contacts extends React.Component {

    state = {
        Contacts: "",
        isLoading: false,
        dataContact: {
            firstName: "",
            lastName: "",
            age: "",
            photo: ""
        },
    }

    // styling header
    static navigationOptions = {
        title: "SIMPLE CONTACT APP",
        headerStyle: {
            backgroundColor: "purple"
        },
        headerTintColor: "white"
    }

    // load data contacts di halaman pertama
    componentDidMount() {
        this.setState({
            isLoading: true
        });

        axios.get('https://simple-contact-crud.herokuapp.com/contact').then((x) => {
            this.setState({
                Contacts: x.data.data,
                isLoading: false
            });
        });
    }

    // note : dan juga fungsi deleteContact ini akan jalan jika fungsi DELETE by ID di dokumentasi bisa jalan, 
    // karna beberapa kali Saya coba fungsi DELETE by ID di dokumentasi >> https://simple-contact-crud.herokuapp.com/documentation#!/contact/deleteContactId, juga fungsinya tidak jalan. 
    // maybe something wrong dengan api nya, or maybe protected. Dan Saya juga tidak bisa melakukan pengecekan problemnya. karna itu data dummy dari contact API heroku. Thank you :) 
    
    // fungsi untuk delete contact by id
    deleteContact = (id) => {
        axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
        .then(() => {
            Alert.alert("Contact deleted!")
            
        })
        .catch(() => {
            Alert.alert("Delete failed!")
        })
    }

    displayContacts() {
        return this.state.Contacts.map((val, i) => {
            var id = val.id;
            var firstName = val.firstName;
            var lastName = val.lastName;
            var age = val.age;
            var photo = val.photo

            // Alert.alert(age.toString())
            return (
                
                <ListItem key={i} avatar>
                    <Left>
                        <Thumbnail source={{ uri: photo }} />
                    </Left>
                    <Body>
                        <Text>{firstName} {lastName}</Text>
                        <Text note>ID {id}</Text>
                        <Text note>Age {age} th</Text>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => {
                                this.props.navigation.navigate("editContact", {
                                    id: id,
                                    firstName: firstName,
                                    lastName: lastName,
                                    age: age,
                                    photo: photo
                                    // disini dikasih semua data yg diperlukan utk ditampilkan di halaman editContact,
                                    // id juga bisa digunakan jika memakai cara API get dataContact by ID di halaman editContact.
                                })
                            }}
                        >
                            <Icon style={{color: "black"}} name="create" />
                        </Button>
                        <Button style={{backgroundColor: "white"}}
                            onPress={() => {
                                this.deleteContact(id)
                            }}
                        >
                            <Icon style={{color: "black"}} name="trash" />
                        </Button>
                    </Right>
                </ListItem>
    
            )
        })
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <List>
                        {this.state.isLoading ? <Spinner /> : this.state.Contacts ? this.displayContacts() : <Text></Text>}
                    </List>
                </ScrollView>
                <Button primary full style={{margin:15}}
                    onPress={() => {
                        this.props.navigation.navigate("addContact")
                    }}
                >
                    <Text>Add Contact</Text>
                </Button>
            </Container>
        )
    }
}

export default Contacts;


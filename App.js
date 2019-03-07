import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Contacts from './components/Contacts';
import addContact from './components/addContact';
import editContact from './components/editContact';



var AppNavigator = createStackNavigator(
  {
    Contacts: Contacts,
    addContact: addContact,
    editContact: editContact
  },
  {
    initialRouteName: "Contacts"
  }
)

export default createAppContainer(AppNavigator);
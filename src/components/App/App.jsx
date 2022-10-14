import { nanoid } from 'nanoid';
import { Wrapper } from './App.styled';
import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export class App extends Component {
  state = { ...initialState };

  filterChange = e => {
    this.setState({ filter: e.target.value });
  };

  addContact = newContact => {
    const isNotExist = this.state.contacts.every(
      contact => contact.name !== newContact.name
    );

    if (isNotExist) {
      const addedContact = {
        id: nanoid(),
        name: newContact.name,
        number: newContact.number,
      };

      this.setState(prevState => {
        return {
          contacts: prevState.contacts.concat(addedContact),
        };
      });
    } else {
      alert(`${newContact.name} is alredy in contacts.`);
    }
  };

  render() {
    const { contacts, filter } = this.state;

    const normilizeFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizeFilter)
    );

    return (
      <Wrapper>
        <ContactForm onSubmit={this.addContact} onChange={this.handleChange} />
        <Filter value={filter} onChange={this.filterChange} />
        <ContactList contacts={filteredContacts} />
      </Wrapper>
    );
  }
}
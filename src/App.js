import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      deck: [],
    };
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { cardName, cardImage, cardDescription,
      cardAttr1, cardAttr2, cardAttr3, cardRare, cardTrunfo } = this.state;
    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    const superTrunfo = cardTrunfo;
    this.setState((prevState) => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      deck: [...prevState.deck, card],
      hasTrunfo: superTrunfo,
    }));
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      const { cardName, cardImage, cardDescription,
        cardAttr1, cardAttr2, cardAttr3 } = this.state;
      const max = 90;
      const sum = 210;
      const attrInvalid = [cardAttr1, cardAttr2, cardAttr3]
        .some((item) => item > max || item < 0);
      const invalid = [cardImage, cardName, cardDescription]
        .some((item) => item.length === 0);
      const sumInvalid = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > sum;
      const isSaveButtonDisabled = attrInvalid || invalid || sumInvalid;
      this.setState({ isSaveButtonDisabled });
    });
  }

  render() {
    const { deck } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } />
        {deck.map((card) => <Card { ...card } key={ card.cardName } />)}
      </div>
    );
  }
}

export default App;

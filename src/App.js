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
      filterName: '',
    };
  }

  setFilterNameValue = ({ target: { value } }) => {
    this.setState({ filterName: value });
  }

  deleteClick = ({ target }) => {
    const { deck } = this.state;
    const findId = target.parentElement.id;
    const newdeck = deck.filter((_element, index) => index !== Number(findId));
    this.setState({ deck: newdeck });
    const deckHasTrunfo = newdeck.some((item) => item.cardTrunfo);
    this.setState({ hasTrunfo: deckHasTrunfo });
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
      isSaveButtonDisabled: true,
    }), () => {
      const { deck } = this.state;
      const deckHasTrunfo = deck.some((item) => item.cardTrunfo);
      this.setState({ hasTrunfo: deckHasTrunfo });
    });
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
    const { deck, filterName } = this.state;
    const deckFiltered = deck.filter(({ cardName }) => cardName.includes(filterName));

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } />
        {deckFiltered.map((card, index) => (
          <div key={ index } id={ index }>
            <Card
              { ...card }
            />
            <button
              type="button"
              data-testid="delete-button"
              onClick={ this.deleteClick }
            >
              Excluir

            </button>
          </div>))}
        <input
          type="text"
          data-testid="name-filter"
          onChange={ this.setFilterNameValue }
        />
      </div>
    );
  }
}

export default App;

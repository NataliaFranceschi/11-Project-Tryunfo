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
      filterRare: '',
      filterTrunfo: false,
      isDisable: false,
    };
  }

  setFilterValue = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      const { filterTrunfo } = this.state;
      this.setState({ isDisable: filterTrunfo });
    });
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
    const { deck, filterName, filterRare, filterTrunfo, isDisable } = this.state;
    const deckName = deck.filter(({ cardName }) => cardName.toLowerCase()
      .includes(filterName.toLowerCase()));
    const deckRare = filterRare !== ''
      ? deckName.filter(({ cardRare }) => cardRare === filterRare)
      : deckName;
    const filterDeck = filterTrunfo
      ? deckRare.filter(({ cardTrunfo }) => cardTrunfo) : deckRare;

    return (
      <div>
        <div className="body">
          <Form
            { ...this.state }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <div className="cardView">
            <Card { ...this.state } />
          </div>
        </div>
        <div className="search">
          <div className="filter">
            <h2>Todas as cartas</h2>
            Filtros de Busca
            <label htmlFor="name-filter">
              <input
                type="text"
                name="filterName"
                data-testid="name-filter"
                disabled={ isDisable }
                onChange={ this.setFilterValue }
                placeholder="Nome da carta"
              />
            </label>
            <select
              name="filterRare"
              data-testid="rare-filter"
              disabled={ isDisable }
              onChange={ this.setFilterValue }
            >
              <option value="">Raridade</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
            <label htmlFor="trunfo-filter">
              Super Trybe Trunfo
              <input
                type="checkbox"
                data-testid="trunfo-filter"
                name="filterTrunfo"
                onChange={ this.setFilterValue }
              />
            </label>
          </div>
          <div className="filterCard">
            {filterDeck.map((card, index) => (
              <div className="deckCard" key={ index } id={ index }>
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;

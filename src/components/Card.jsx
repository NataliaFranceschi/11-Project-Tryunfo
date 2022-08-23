import React from 'react';
import PropTypes from 'prop-types';
import SuperTrunfo from './SuperTrunfo.png';

class Card extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo } = this.props;

    return (
      <div className="border">
        <div className="card">
          <h2 className="name" data-testid="name-card">{cardName}</h2>
          {
            cardTrunfo ? <img
              data-testid="trunfo-card"
              className="trunfo-card"
              src={ SuperTrunfo }
              alt="SuperTrunfo"
            /> : null
          }
          <img
            className="image"
            data-testid="image-card"
            src={ cardImage }
            alt={ cardName }
          />
          <p className="rare" data-testid="rare-card">{cardRare}</p>
          <p
            className="description"
            data-testid="description-card"
          >
            {cardDescription}

          </p>
          <div className="attr">
            <span data-testid="attr1-card">
              Attr1 ..............................................
              { cardAttr1 }
            </span>
            <span data-testid="attr2-card">
              Attr2 ..............................................
              { cardAttr2 }
            </span>
            <span data-testid="attr3-card">
              Attr3 ..............................................
              { cardAttr3 }
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;

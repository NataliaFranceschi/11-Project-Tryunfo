import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <form className="form">
          <label htmlFor="name">
            Nome
            <input type="text" data-testid="name-input" name="name" />
          </label>
          <label htmlFor="description">
            Descrição
            <textarea
              data-testid="description-input"
              name="description"
              cols="30"
              rows="10"
            />
          </label>
          <label htmlFor="attr1">
            Attr1
            <input type="number" data-testid="attr1-input" name="attr1" />
          </label>
          <label htmlFor="attr2">
            Attr2
            <input type="number" data-testid="attr2-input" name="attr2" />
          </label>
          <label htmlFor="attr3">
            Attr3
            <input type="number" data-testid="attr3-input" name="attr3" />
          </label>
          <label htmlFor="image">
            Imagem
            <input type="file" data-testid="image-input" name="image" />
          </label>
          <label htmlFor="rare">
            Raridade
            <select name="rare" data-testid="rare-input">
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          <label htmlFor="trunfo">
            Super Trybe Trunfo
            <input type="checkbox" data-testid="trunfo-input" />
          </label>
          <button type="button" data-testid="save-button"> Salvar</button>
        </form>
      </div>
    );
  }
}

export default Form;

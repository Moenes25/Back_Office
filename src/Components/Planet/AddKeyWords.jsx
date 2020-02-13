/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import {
  Form,
  Label,
  Container,
  Popup,
  Icon,
} from 'semantic-ui-react';

import ADD_KEYWORD from '../../Graphql/Mutations/Planet/KeyWord/createKeyWord';
import withStyle from './withStyle';


class AddKeyWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      keyWords: props.keyWords,
      score: 0,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  addKeyWrod = async () => {
    const { label, score, keyWords } = this.state;
    const scoreInt = parseInt(score, 0);
    const { addKeyword } = this.props;
    const result = await addKeyword({ label, score: scoreInt });
    const { data: { createKeyword } } = result;
    this.setState({ keyWords: [createKeyword, ...keyWords], label: '', score: 0 });
  };

  removeKeyWord = (id) => {
    const { keyWords } = this.state;
    const newKeywords = keyWords.filter((element) => element.id !== id);
    this.setState({ keyWords: newKeywords });
  }


  render() {
    const {
      label, keyWords, score,
    } = this.state;
    const { className, addKeyWords, close } = this.props;
    const keyWordsView = keyWords.length > 0 ? keyWords.map((element) => (
      <Popup
        trigger={(
          <Label style={{ marginBottom: '2px' }}>
            {element.label}
            <Icon name="delete" onClick={() => this.removeKeyWord(element.id)} />
          </Label>
        )}
        key={element.id}
        onClick={this.openClose}
        content={element.score}
      />
    )) : null;
    return (
      <div className={className}>
        <Form>
          <Form.Group>
            <Form.Input label="Mot clés" name="label" value={label} placeholder="Mot clés" width={6} onChange={this.handleChange} />
            <Form.Input label="Score" name="score" value={score} placeholder="Score" width={2} onChange={this.handleChange} />
            <Icon name="add" size="large" style={{ marginLeft: '5px', marginTop: '3.5%', cursor: 'pointer' }} onClick={this.addKeyWrod} />
          </Form.Group>
          <Form.Group>
            <Container fluid>
              {keyWordsView}
            </Container>
          </Form.Group>
          <Form.Group>
            <Form.Button
              secondary
              floated="right"
              type="button"
              onClick={() => {
                addKeyWords(keyWords);
                close();
              }}
            >
            Ajouter Mots clés
            </Form.Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

AddKeyWords.propTypes = {
  className: PropTypes.string,
  keyWords: PropTypes.array.isRequired,
  addKeyWords: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default compose(withStyle, graphql(ADD_KEYWORD, {
  props: ({ mutate }) => ({
    addKeyword: (input) => mutate({
      variables: {
        input,
      },
    }),
  }),
}))(AddKeyWords);

/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Label,
  Icon,
} from 'semantic-ui-react';
import withStyle from './withStyle';

class QuestionsList extends Component {
  constructor(props) {
    super(props);
    const { questions } = props;
    this.state = {
      questions,
    };
  }

  render() {
    const {
      questions,
    } = this.state;
    const { className } = this.props;
    console.log('***************', questions);
    const questionsView = questions.length > 0 ? questions.map((element) => (
      <Segment.Group key={element.id}>
        <Segment>{element.questionLabel}</Segment>
        <Label color="teal" ribbon="right" className="my-tag">
        level:  {element.level}
          <Icon name="delete" />
        </Label>
        <Segment.Group>
          {
            element.answers.map((answer) => (
              <Segment secondary size="mini" key={answer.id}>
                <p>{answer.answer}</p>
                <Label color="teal" ribbon="right" className="my-tag">
        score:  {answer.score}
                  <Icon name="delete" />
                </Label>
              </Segment>
            ))
          }
        </Segment.Group>
      </Segment.Group>
    )) : <h4>Liste des questions est vide</h4>;
    return (
      <Container className={className} fluid>
        {questionsView}
      </Container>
    );
  }
}

QuestionsList.propTypes = {
  questions: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default withStyle(QuestionsList);

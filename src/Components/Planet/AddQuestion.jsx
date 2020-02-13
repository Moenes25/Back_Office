/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import {
  Form,
  Label,
  Segment,
  Icon,
} from 'semantic-ui-react';

import withStyle from './withStyle';
import ADD_QUESTION from '../../Graphql/Mutations/Planet/Question/createQuestion';
import ADD_ANSWER from '../../Graphql/Mutations/Planet/Question/Answer/createAnswer';

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionLabel: '',
      level: '',
      answers: [],
      score: 0,
      answer: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  addAnswer = async () => {
    const { answer, score, answers } = this.state;
    const { createAnswer } = this.props;
    const scoreInt = parseInt(score, 0);
    const result = await createAnswer({ label: answer, score: scoreInt });
    const newAnswer = result.data.createAnswer;
    this.setState({ answers: [newAnswer, ...answers], answer: '' });
  };

  addQuestion = async () => {
    const { questionLabel, level, answers } = this.state;
    const { createQuestion, addQuestion, close } = this.props;
    const answersId = answers.map((element) => element.id);
    const result = await createQuestion({ questionLabel, level, answers: answersId });
    const question = result.data.createQuestion;
    addQuestion({
      questionLabel: question.questionLabel,
      level: question.level,
      answers: question.answers,
      id: question.id,
    });
    close();
  }

  handleLevelChange = (event, { value }) => {
    this.setState({ level: value });
  }

  removeAnswer= (id) => {
    const { answers } = this.state;
    const newAnswers = answers.filter((element) => element.id !== id);
    this.setState({ answers: newAnswers });
  }

  render() {
    const {
      questionLabel, level, answers, answer, score,
    } = this.state;
    const { className } = this.props;
    const answersView = answers.length > 0 ? (
      <Segment.Group piled className="my-group-segment">
        {answers.map((element) => (
          <Segment secondary size="mini" key={element.id}>
            <p>{element.label}</p>
            <Label color="teal" ribbon="right" className="my-tag">
        score:  {element.score}
              <Icon name="delete" onClick={() => this.removeAnswer(element.id)} />
            </Label>
          </Segment>
        ))}
      </Segment.Group>
    )
      : null;
    const levelOptions = [
      {
        key: 'be',
        value: 'beginner',
        text: 'débutant',
      },
      {
        key: 'in',
        value: 'intermediate',
        text: 'intermédiaire',
      },
      {
        key: 'ex',
        value: 'expert',
        text: 'expert',
      },
    ];
    return (
      <div className={className}>
        <Form>
          <Form.Group>
            <Form.Input label="Question" name="questionLabel" value={questionLabel} placeholder="Question" width={12} onChange={this.handleChange} />
            <Form.Select label="Niveau" value={level} placeholder="Niveau" width={4} onChange={this.handleLevelChange} options={levelOptions} />
          </Form.Group>
          <Form.Group>
            {answersView}
          </Form.Group>
          <Form.Group>
            <Form.Input label="Réponse" name="answer" value={answer} placeholder="Réponse" width={12} onChange={this.handleChange} />
            <Form.Input label="Score" name="score" value={score} placeholder="Score" width={2} onChange={this.handleChange} />
            <Icon name="add" size="large" style={{ marginLeft: '5px', marginTop: '3.5%', cursor: 'pointer' }} onClick={this.addAnswer} />
          </Form.Group>
          <Form.Group>
            <Form.Button
              secondary
              floated="right"
              type="button"
              onClick={() => this.addQuestion()}
            >
            Ajouter Question
            </Form.Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

AddQuestion.propTypes = {
  className: PropTypes.string,
  addQuestion: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default compose(withStyle, graphql(ADD_ANSWER, {
  props: ({ mutate }) => ({
    createAnswer: (input) => mutate({
      variables: {
        input,
      },
    }),
  }),
}),
graphql(ADD_QUESTION, {
  props: ({ mutate }) => ({
    createQuestion: (input) => mutate({
      variables: {
        input,
      },
    }),
  }),
}))(AddQuestion);

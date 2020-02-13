/* eslint-disable react/prop-types */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';Q
import { graphql, compose, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Modal,
  Icon,
  Header,
} from 'semantic-ui-react';
import AddQuestion from './AddQuestion';
import AddKeyWords from './AddKeyWords';
import QuestionsList from './QuestionList';
// eslint-disable-next-line camelcase
import GET_ALL_USER_By_Type from '../../Graphql/Query/User/usersByType';
import GET_ALL_PLANET from '../../Graphql/Query/Planet/querylistplanet';
import ADD_PLANET from '../../Graphql/Mutations/Planet/createPlanet';
import UPDATE_PLANET from '../../Graphql/Mutations/Planet/updatePlanet';
// import UPDATE_KEYWORD from '../../Graphql/Mutations/Planet/KeyWord/updateKeyword';
// import UPDATE_ANSWER from '../../Graphql/Mutations/Planet/Question/Answer/updateAnswer';
// import UPDATE_QUESTION from '../../Graphql/Mutations/Planet/Question/updateQuestion';
class AddUpdatePlanet extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    if (props.planet) {
      const {
        labelPlanet,
        scoreMinKeyword,
        scoreMinQuestion,
        level,
        slot,
        questions,
        keywords,
        idRh,
        recruiter,

      } = props.planet;
      this.state = {
        id: '',
        labelPlanet,
        scoreMinKeyword,
        scoreMinQuestion,
        level,
        slot,
        questions,
        keywords,
        idRh,
        recruiter,
      };
    } else {
      this.state = {
        scoreMinQuestion: 0,
        scoreMinKeyword: 0,
        questions: [],
        level: '',
        labelPlanet: '',
        keywords: [],
        idRh: '',
        slot: 0,
        rhOptions: [],
        recruitersOptions: [],
        openKeyWords: false,
        openQuestions: false,
        openQuestionsList: false,
      };
    // this.state = {
    //   scoreMinQuestion: this.props.planet.scoreMinQuestion || 0,
    //   id: this.props.planet.id || null,
    //   scoreMinKeyword: this.props.planet.scoreMinKeyword || 0,
    //   questions: this.props.planet.questions || [],
    //   level: this.props.planet.level || '',
    //   labelPlanet: this.props.planet.labelPlanet || '',
    //   keywords: this.props.planet.keywords || [],
    //   idRh: this.props.planet.idRh || '',
    //   slot: this.props.planet.slot || 0,
    //   rhOptions: this.props.planet.rhOptions || [],
    //   recruitersOptions: this.props.planet.recruitersOptions || [],
    //   openKeyWords: this.props.planet.openKeyWords || false,
    //   openQuestions: this.props.planet.openQuestions || false,
    //   openQuestionsList: this.props.planet.openQuestionsList || false,
    // };
    }
  }

  componentDidUpdate(prevProps) {
    const { rh, recruiters } = this.props;
    console.log(rh, recruiters);
    if (recruiters !== prevProps.recruiters) {
      const recruitersOptions = recruiters.map((user) => ({
        key: user.id,
        value: user.id,
        text: `${user.firstName} ${user.lastName}`,
      }));
      const rhOptions = rh.map((user) => ({
        key: user.id,
        value: user.id,
        text: `${user.firstName} ${user.lastName}`,
      }));
      this.setState({ recruitersOptions, rhOptions });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelectChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  }

  addQuestion = (question) => {
    const { questions } = this.state;
    this.setState({ questions: [question, ...questions] });
  }

  addKeyWords = (newKeyWords) => {
    this.setState({ keywords: newKeyWords });
  }

  openCloseKeyWords = () => {
    const { openKeyWords } = this.state;
    this.setState({ openKeyWords: !openKeyWords });
  }

  openCloseQuestions = () => {
    const { openQuestions } = this.state;
    this.setState({ openQuestions: !openQuestions });
  }

  openCloseQuestionsList = () => {
    const { openQuestionsList } = this.state;
    this.setState({ openQuestionsList: !openQuestionsList });
  }

  createPlanet= (createPlanet, planetInput) => {
    const { history } = this.props;
    createPlanet({
      variables: {
        input: { ...planetInput },
      },
    }).then(() => history.push('/app/planetes-list'));
  }

  updatePlanet= (updatePlanet, planetInput) => {
    const { history } = this.props;
    const { id } = this.state;
    updatePlanet({
      variables: {
        input: { ...planetInput },
        id,
      },
    }).then(() => history.push('/app/planetes-list'));
  }

  render() {
    const {
      scoreMinQuestion,
      scoreMinKeyword,
      openQuestionsList,
      questions,
      level,
      labelPlanet,
      keywords,
      recruiter,
      idRh,
      slot,
      openKeyWords,
      openQuestions,
      recruitersOptions,
      rhOptions,
    } = this.state;
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
    const { planet } = this.props;
    const ACTION = (planet) ? 'Modifier' : 'Ajouter';
    const MUTATION = (planet) ? UPDATE_PLANET : ADD_PLANET;
    const MUTATION_ACTION = (planet) ? this.updatePlanet : this.createPlanet;
    return (
      // <Mutation mutation={ADD_PLANET}>
      <Mutation mutation={MUTATION} refetchQueries={() => [{ query: GET_ALL_PLANET }]}>
        {(actionPlanet) => console.log('----------', actionPlanet) || (
          <div>
            <Form style={{ marginLeft: '300px' }}>
              <Form.Group>
                <Form.Input label="Label" placeholder="Label" width={8} onChange={this.handleChange} name="labelPlanet" value={labelPlanet} />
                <Form.Select label="Niveau" placeholder="Niveau" width={4} onChange={this.handleSelectChange} name="level" value={level} options={levelOptions} />
              </Form.Group>
              <Form.Group>
                <Form.Select label="Recruiter" placeholder="Recruiter" width={6} onChange={this.handleSelectChange} options={recruitersOptions} name="recruiter" />
                <Form.Select label="Responsable ressources humaine" placeholder="Responsable ressources humaine" defaultValue={idRh} width={6} onChange={this.handleSelectChange} name="idRh" options={rhOptions} />
              </Form.Group>
              <Form.Group>
                <Form.Input label="Score Minimum questions" placeholder="Score Minimum questions" width={4} onChange={this.handleChange} name="scoreMinQuestion" value={scoreMinQuestion} />
                <Form.Input label="Score Minimum mots clés" placeholder="Score Minimum mots clés" width={4} onChange={this.handleChange} name="scoreMinKeyword" value={scoreMinKeyword} />
                <Form.Input label="Slot" placeholder="Slot" name="slot" value={slot} width={4} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group>
                <div style={{ paddingLeft: '1%' }}>
                  <Button
                    basic
                    color="black"
                    content="Questions"
                    icon="question"
                    onClick={this.openCloseQuestionsList}
                    label={{
                      as: 'a', basic: true, color: 'black', pointing: 'left', content: '',
                    }}
                  />
                  <Icon name="add" size="large" style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={this.openCloseQuestions} />
                </div>
                <div style={{ paddingLeft: '5%' }}>
                  <Button
                    basic
                    color="black"
                    content="Mots clés"
                    icon="key"
                    onClick={this.openCloseKeyWords}
                    label={{
                      as: 'a', basic: true, color: 'black', pointing: 'left', content: '',
                    }}
                  />
                  <Icon name="add" size="large" style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={this.openCloseKeyWords} />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Button
                  secondary
                  floated="right"
                  type="button"
                  onClick={() => MUTATION_ACTION(actionPlanet, {
                    scoreMinQuestion: parseInt(scoreMinQuestion, 0),
                    scoreMinKeyword: parseInt(scoreMinKeyword, 0),
                    questions: questions.map((element) => element.id),
                    level,
                    labelPlanet,
                    keywords: keywords.map((element) => element.id),
                    idRecruiter: recruiter,
                    idRh,
                    slot: parseInt(slot, 0),
                  })}
                >
                  {
                    ACTION
                  }
                </Form.Button>
              </Form.Group>
            </Form>
            <Modal open={openQuestions}>
              <Icon name="close" onClick={this.openCloseQuestions} />
              <Header>
                <Icon name="archive" />
            Ajouter Un nouveau Question
              </Header>
              <Modal.Content>
                <AddQuestion addQuestion={this.addQuestion} close={this.openCloseQuestions} />
              </Modal.Content>
            </Modal>
            <Modal open={openKeyWords}>
              <Icon name="close" onClick={this.openCloseKeyWords} />
              <Header>
                <Icon name="archive" />
            Ajouter des mots clés
              </Header>
              <Modal.Content>
                <AddKeyWords
                  addKeyWords={this.addKeyWords}
                  keyWords={keywords}
                  close={this.openCloseKeyWords}
                />
              </Modal.Content>
            </Modal>
            <Modal open={openQuestionsList}>
              <Icon name="close" onClick={this.openCloseQuestionsList} />
              <Header>
                <Icon name="archive" />
            Liste des Questions
              </Header>
              <Modal.Content>
                <QuestionsList questions={questions} />
              </Modal.Content>
            </Modal>
          </div>
        )}
      </Mutation>

    );
  }
}

AddUpdatePlanet.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
};

export default compose(
  graphql(GET_ALL_USER_By_Type, {
    props: ({ data: { usersByType } }) => ({ recruiters: usersByType }),
    options: () => ({ variables: { type: 'recruiter' } }),
  }),
  graphql(GET_ALL_USER_By_Type, {
    props: ({ data: { usersByType } }) => ({ rh: usersByType }),
    options: () => ({ variables: { type: 'rh' } }),
  }), withRouter
)(AddUpdatePlanet);

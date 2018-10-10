import React, { Component } from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import createHistory from 'history/createBrowserHistory'
import quizQuestionsTest1 from '../api/quizQuestionsTest1';
import Quiz from './Quiz';
import Result from './Result';
import QuestionCount from './QuestionCount';
const history = createHistory();

const initialState = {
  counter: 0,
  questionId: 1,
  question: '',
  answerOptions: [],
  answer: '',
  answersCount: {
    Visual: 0,
    Audi: 0,
    Kinest: 0,
    None: 0
  },
  result: '',
  allAnswers: [],
  sending: false
};
class Test_1 extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.baseState = this.state;
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestionsTest1.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: quizQuestionsTest1[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  handleSubmit(e){
      e.preventDefault();
      const name = document.getElementById('name').value;
      // const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      this.setState({sending:true});
      axios({
          method: "POST",
          url:"https://powerful-badlands-17872.herokuapp.com/send",
          data: {
              name: name,
              // email: email,
              message: "Діагностика домінуючої перцептивної модальності \n" + "\n" + message
          }
      }).then((response)=>{
          if (response.data.msg === 'success'){
              this.resetForm();
              this.setState(initialState);
              const shuffledAnswerOptions = quizQuestionsTest1.map((question) => this.shuffleArray(question.answers));
              this.setState({
                question: quizQuestionsTest1[0].question,
                answerOptions: shuffledAnswerOptions[0]
              });
              NotificationManager.success('Ваша анкета була відправленна!');
          }else if(response.data.msg === 'fail'){
              alert("Message failed to send.");
          }
      })
  }
  resetForm(){
    document.getElementById('contact-form').reset();
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    //
    // // While there remain elements to shuffle...
    // while (0 !== currentIndex) {
    //
    //   // Pick a remaining element...
    //   randomIndex = Math.floor(Math.random() * currentIndex);
    //   currentIndex -= 1;
    //
    //   // And swap it with the current element.
    //   temporaryValue = array[currentIndex];
    //   array[currentIndex] = array[randomIndex];
    //   array[randomIndex] = temporaryValue;
    // }

    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestionsTest1.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });
    this.state.allAnswers.push(this.state.question+" — "+answer);
    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestionsTest1[counter].question,
        answerOptions: quizQuestionsTest1[counter].answers,
        answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    answersCountKeys.pop();
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
    Array.prototype.sample = function(){
      return this[Math.floor(Math.random()*this.length)];
    }
    let resultAnswer = answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    return new Array(resultAnswer.sample());
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      <div className="container my-0">
        <div className="row">
          <div className="col-12 text-center justify-content-center">
              <p className="quiz_subtitle d-block mb-sm-5 col-12 mt-3">Діагностика домінуючої перцептивної модальності</p>
          </div>
        </div>
        <div className="row reverso-sm">
          <div className="col-12">
            <div className="row text-center justify-content-center">
                  <div className="col-12 col-md-4">
                  <img className="quiz_info__img" src="./svg/test-header-1.svg" alt=""/>
                <p className="quiz_info__text mt-3">Тест займає менше 12 хвилин.</p>
                </div>
                <div className="col-12 col-md-4">
                  <img className="quiz_info__img" src="./svg/test-header-2.svg" alt=""/>
                <p className="quiz_info__text mt-3">Відповідайте чесно (навіть якщо вам не подобається відповідь).</p>
              </div>
                <div className="col-12 col-md-4">
                  <img className="quiz_info__img" src="./svg/test-header-3.svg" alt=""/>
                <p className="quiz_info__text mt-3">Тест не розрахований на "нейтральні" відповіді.</p>
              </div>
            </div>
          </div>
          <Quiz
            answer={this.state.answer}
            answerOptions={this.state.answerOptions}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestionsTest1.length}
            onAnswerSelected={this.handleAnswerSelected}
          />
      </div>
    </div>
    );
  }

  renderResult() {
    return (
      <Result
        quizResult={this.state.result}
        allAnswers={this.state.allAnswers}
        handleSubmit={this.handleSubmit}
        sending={this.state.sending} />
    );
  }

  render() {
    return (
      <div className="col-12">
        {this.state.result ? this.renderResult() : this.renderQuiz()}
        <NotificationContainer/>
      </div>
    );
  }

}

export default Test_1;

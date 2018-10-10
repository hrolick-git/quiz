import React, { Component } from 'react';
import update from 'react-addons-update';
import $ from 'jquery';
import axios from 'axios';
import quizQuestionsTest2 from '../api/quizQuestionsTest2';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Result from './Result';

const initialState = {
  counter: 0,
  questionId: 1,
  question: '',
  subquestion: '',
  answerOptions: [],
  answer: '',
  answersCount: {
      Visual: 0,
      Audi: 0,
      Kinest: 0,
  },
  result: '',
  allAnswers: [],
  showResults: false,
  allAnswersCheck: false,
  sending: false
};

class Test_2 extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.summCountAnswer = this.summCountAnswer.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
              message: "БІАС-тест для визначення репрезентативних систем \n" + "\n" + message
          }
      }).then((response)=>{
          if (response.data.msg === 'success'){
              this.resetForm();
              this.setState(initialState);
              this.setState({
                showResults: false,
                allAnswersCheck: false
              });
              NotificationManager.success('Ваша анкета була відправленна!');
          }else if(response.data.msg === 'fail'){
              NotificationManager.success('Ваша анкета була відправленна!');
          }
      })
  }
  resetForm(){
    document.getElementById('contact-form').reset();
  }

  summCountAnswer(name) {
    let audiFun = () => {
      var countAudi = 0;
      $("input[name^='Audi']:checked").each(function(input){
        countAudi = countAudi + parseInt($(this).val(),10);
      });
      this.setState({
        answersCount: {...this.state.answersCount, Audi: countAudi}
      });
    }
    let visualFun = () => {
      var countVisual = 0;
      $("input[name^='Visual']:checked").each(function(input){
        countVisual = countVisual + parseInt($(this).val(),10);
      });
      this.setState({
        answersCount: {...this.state.answersCount, Visual: countVisual}
      });
    }
    let kinestFun = () => {
      var countKinest = 0;
      $("input[name^='Kinest']:checked").each(function(input){
        countKinest = countKinest + parseInt($(this).val(),10);
      });
      this.setState({
        answersCount: {...this.state.answersCount, Kinest: countKinest}
      });
    }

    switch (name) {
      case (name.match(/Audi/)||{}).input:
        return audiFun();
      case (name.match(/Visual/)||{}).input:
        return visualFun();
      case (name.match(/Kinest/)||{}).input:
        return kinestFun();
      default:
        return this.state;
    }
  }

  handleAnswerClick(e) {
    let setBtnEnable = () => {
      this.setState({
        allAnswersCheck: true
      });
    }

    $(":radio").change(function() {
        var names = {};
        $(':radio').each(function() {
            names[$(this).attr('name')] = true;
        });
        var count = 0;
        $.each(names, function() {
            count++;
        });
        if ($(':radio:checked').length === count) {
           $('.btn_result__top-text').hide();
           setBtnEnable();
        }
    });
  }

  handleAnswerSelected(e){
    let change = {};
    change[e.target.name] = e.target.value;
    console.log(change);
    this.setState(change);
    this.summCountAnswer(e.target.name);
    console.log(this.state.answersCount);
  }

  handleAnswerSubmit(){
    this.setState({
      showResults: true
    });
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
    Array.prototype.sample = function(){
      return this[Math.floor(Math.random()*this.length)];
    }
    let resultAnswer = answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    console.log("resultAnswer:"+resultAnswer);
    console.log(answersCount);
    let result = new Array(resultAnswer.sample());
    this.setState({ result: result[0] });
  }

  renderQuiz2() {
    return(
      <div className="container my-0">
        <div className="row">
        </div>
        <div className="row">
          <div className="col-12 text-center justify-content-center">
              <p className="quiz_subtitle d-block mb-sm-5 col-12 mt-3">БІАС-тест для визначення репрезентативних систем</p>
          </div>
        </div>
        <div className="row reverso-sm">
          <div className="col-12">
            <div className="row text-center justify-content-center">
                <div className="col-12 col-md-4">
                  <img className="quiz_info__img" src="./svg/test-header-1.svg" alt=""/>
                  <p className="quiz_info__text mt-3">Тест займає менше 5 хвилин.</p>
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
        </div>
        <hr/>
      <div className="row quiz__wrap px-sm-4">
        {quizQuestionsTest2.map((question, i1) => {
          return(
            <div key={i1} className="mb-5 col-12">
              <p className="quiz__question__title">{question.question}</p>
              <div className="">
                {question.subquestions.map((subquestion, i2) => {
                  return(
                    <div key={i2} className="quiz_subquestion">
                      <p className="quiz_subquestion_question">{subquestion.question}</p>
                    <ul className="answerOptions row mt-0">
                      {subquestion.answers.map((answer, i3) => {
                          return(
                            <li className="quiz_answer__item_circle col-3 col-md-1" key={i3}>
                              <input
                                className="quiz_answer__input"
                                type="radio"
                                value={answer.content}
                                onClick={this.handleAnswerClick}
                                onChange={this.handleAnswerSelected}
                                name={answer.type+"-"+i1+i2}
                                id={answer.type+"-"+i1+i2+i3}
                                ></input>
                                <label
                                  className={"quiz_answer_circle quiz_answer__label " +" "+(answer.positive?"quiz_answer_positive":"quiz_answer_negative")}
                                  htmlFor={answer.type+"-"+i1+i2+i3}>
                                </label>
                            </li>
                          );
                        })}
                        </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <hr/>
      <div className="col-12 text-center mb-5">
          <p className="btn_result__top-text">Треба відповісти на усі запитання!</p>
          <button type="button" onClick={this.handleAnswerSubmit} className="btn btn-primary" disabled={!this.state.allAnswersCheck}>Перевірити результат</button>
      </div>
    </div>
    );
  }

  renderResult2() {
    return(
      <Result
        quizResult={this.state.result}
        allAnswers={this.state.allAnswers}
        handleSubmit={this.handleSubmit}
        sending={this.state.sending} />
    );
  }

  render() {
    return(
      <div className="col-12">
        {this.state.showResults ? this.renderResult2() : this.renderQuiz2()}
        <NotificationContainer/>
      </div>
    );
  }
}

export default Test_2;

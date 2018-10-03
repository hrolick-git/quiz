import React, { Component } from 'react';
import update from 'react-addons-update';
import quizQuestionsTest2 from '../api/quizQuestionsTest2';
import $ from 'jquery';

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
    Kinest: 0
  },
  result: '',
  allAnswers: []
  };

  class Test_2 extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.summCountAnswer = this.summCountAnswer.bind(this);
  }

  summCountAnswer() {
      var countAudi = 0;
      $("input[name^='Audi']:checked").each(function(input){
        countAudi = countAudi + parseInt($(this).val(),10);
      });
       this.setState({
         answersCount: {...this.state.answersCount, Audi: countAudi}
       });
  }

  handleAnswerSelected(e){
    let change = {};
    change[e.target.name] = e.target.value;
    console.log(change);
    this.setState(change);
    this.summCountAnswer();
    console.log(this.state.answersCount);
  }

  render() {
    return (
      <div className="container">
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
        {quizQuestionsTest2.map((question, i1) => {
          return(
            <div key={i1} className="mt-5">
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
    );
  }

}

export default Test_2;

import React, { Component } from 'react';
import update from 'react-addons-update';
import quizQuestionsTest2 from '../api/quizQuestionsTest2';
import $ from 'jquery';
import bodymovin from 'bodymovin';
import * as animationData from '../svg/confetti.json';
import * as animationDataWhal from '../svg/empty_status.json';
import * as animationDataBox from '../svg/box.json';

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

var animFireworks, animWhal, animBox;

class Test_2 extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.summCountAnswer = this.summCountAnswer.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }

  componentDidMount() {
    animFireworks = bodymovin.loadAnimation({
      container: document.getElementById('bm'), // the dom element
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animationData, // the animation data
      rendererSettings: {
        scaleMode: 'noScale',
        clearCanvas: false,
        progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
        className: 'some-css-class-name'
      }
    });
    animWhal = bodymovin.loadAnimation({
      container: document.getElementById('a-whal'), // the dom element
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationDataWhal, // the animation data
      rendererSettings: {
        scaleMode: 'noScale',
        clearCanvas: false,
        progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
        className: 'anim_whal'
      }
    });
    animBox = bodymovin.loadAnimation({
      container: document.getElementById('a-box'), // the dom element
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animationDataBox, // the animation data
      rendererSettings: {
        scaleMode: 'noScale',
        clearCanvas: false,
        progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
        className: 'anim_box'
      }
    });
    $(".show").on("click", function(){
        animBox.setDirection(1);
        $("#a-box").show();
        animBox.play();
    });
    $(".hide").on("click", function(){
        animBox.setDirection(-1);
        animBox.play();
        setTimeout(function(){
          $("#a-box").hide();
        }, 1500);
    });
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
    $("#bm").show();
    $("#bm").offset({left:e.pageX-50,top:e.pageY-50});
    animFireworks.play();
    setTimeout(function(){
      animFireworks.stop();
      $("#bm").hide();
    }, 1500);
  }

  handleAnswerSelected(e){
    let change = {};
    change[e.target.name] = e.target.value;
    console.log(change);
    this.setState(change);
    this.summCountAnswer(e.target.name);
    console.log(this.state.answersCount);
  }


  render() {
    return (
      <div className="container">
          <div id="bm"></div>
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
                  {/* <img className="quiz_info__img" src="./svg/test-header-1.svg" alt=""/> */}
                  <div id="a-box" className="hide"></div>
                  <div id="a-whal" className="mx-auto show"></div>
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
      <hr/>
      <div className="row">
        <div className="col-12 text-center">
        <button type="button" disabled>Перевірити результат</button>
        </div>
      </div>
    </div>
    );
  }

}

export default Test_2;

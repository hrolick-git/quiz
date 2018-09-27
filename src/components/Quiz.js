import React from 'react';
import Question from './Question';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Quiz(props) {

  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        positive={key.positive}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

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
                  <div className="col-12 col-md-3">
                  <img className="quiz_info__img" src="./svg/test-header-1.svg" alt=""/>
                <p className="quiz_info__text mt-3">Тест займає менше 12 хвилин.</p>
                </div>
                <div className="col-12 col-md-3">
                  <img className="quiz_info__img" src="./svg/test-header-2.svg" alt=""/>
                <p className="quiz_info__text mt-3">Відповідайте чесно (навіть якщо вам не подобається відповідь).</p>
              </div>
                <div className="col-12 col-md-3">
                  <img className="quiz_info__img" src="./svg/test-header-3.svg" alt=""/>
                <p className="quiz_info__text mt-3">Тест не розрахований на "нейтральні" відповіді.</p>
              </div>
            </div>
          </div>
          <div key={props.questionId} className="col-12">
            <QuestionCount
              counter={props.questionId}
              total={props.questionTotal}
            />
            <div className="quiz__wrap mb-5">
                  <Question content={props.question} />
                  <ul className="answerOptions row mt-4">
                    {props.answerOptions.map(renderAnswerOptions)}
                  </ul>
            </div>
          </div>
        </div>
    </div>
  );
}

 export default Quiz;

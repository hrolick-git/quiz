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
    <div className="container my-0">
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
  );
}

 export default Quiz;

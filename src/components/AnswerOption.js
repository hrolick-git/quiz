import React from 'react';

const AnswerOption = (props) => (
  <li className="quiz_answer__item col-6">
    <input
         type="radio"
         className="quiz_answer__input"
         name="radioGroup"
         checked={props.answerType === props.answer}
         id={props.answerType}
         value={props.answerType}
         disabled={props.answer}
         onChange={props.onAnswerSelected}
       />
    <label
      className={"quiz_answer__label" +" "+(props.positive?"quiz_answer_positive":"quiz_answer_negative")}
      htmlFor={props.answerType}>
      {props.answerContent}
    </label>
  </li>
);

  export default AnswerOption;

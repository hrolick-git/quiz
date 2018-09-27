import React from 'react';

const divStyle = (counter, total) => {
  return {width: (((counter-1)*100)/total) + '%'};
};

const QuestionCount = (props) => (
  <div className="questionCount mt-2 mb-4">
    <p className="quiz__question_title">Питання <span>{props.counter}</span> із <span>{props.total}</span></p>
    <div className="progress my-sm-3">
       <div className="progress-bar bg-progress-info"
         style={divStyle(props.counter,props.total)}
         role="progressbar"
         width="50%"
         aria-valuenow={props.counter}
         aria-valuemin="0"
         aria-valuemax={props.total}>
       </div>
     </div>
  </div>
);

 export default QuestionCount;

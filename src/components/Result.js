import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function switchImages(expression){
  switch (expression) {
    case "Visual":
      return <img className="quiz_answer__img mx-auto mt-5" src="./svg/visual.svg" alt=""/>;
    case "Kinest":
      return <img className="quiz_answer__img mx-auto mt-5" src="./svg/kinestet.svg" alt=""/>;
    case "Audi":
      return <img className="quiz_answer__img mx-auto mt-5" src="./svg/audial.svg" alt=""/>;
  }
}

function switchTitleResults(expression){
  switch (expression) {
    case "Visual":
      return "Візуальний";
    case "Kinest":
      return "Кінестетичний";
    case "Audi":
      return "Аудіальний";
  }
}

function handleChange(e) {
   let change = {};
   change[e.target.name] = e.target.value;
   this.setState(change);
 }

const Result = (props) => (

  <ReactCSSTransitionGroup
    className="result"
    component="div"
    transitionName="fade"
    transitionEnterTimeout={800}
    transitionLeaveTimeout={500}
    transitionAppear
    transitionAppearTimeout={500}
  >
    <div className="container mt-0 text-center">
      <div className="row">
        <div className="col-12">
          <h2 className="result__title">Твій тип сприйняття <strong>{switchTitleResults(props.quizResult)}</strong>!</h2>
          {switchImages(props.quizResult)}
        </div>
        <div className="col-12 col-md-8 col-lg-7 mt-4 mx-auto">
          <form id="contact-form" onSubmit={props.handleSubmit.bind(this)} method="POST">
              <div className="form-group">
                  <input type="text" className="form-control" id="name" placeholder="Твоє ім'я*" required />
              </div>
              <div className="form-group d-none">
                <textarea className="form-control" rows="5" id="message" onChange={handleChange} value={(props.quizResult+"\n"+ props.allAnswers.join("\n"))}></textarea>
              </div>
              <button type="submit" className="btn btn-for-form">{!props.sending?"Відправити результат":<i class="fas fa-spinner fa-spin"></i>}</button>
          </form>
        </div>
      </div>
    </div>
  </ReactCSSTransitionGroup>
);

export default Result;

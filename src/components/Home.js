import React, { Component } from 'react';
import $ from 'jquery';

export default class Home extends Component {
    render() {
      return (
        <div className="col-12">
          <div className="container my-0">
            <div className="row">
              <div className="col-12 text-center justify-content-center">
                  <p className="quiz_subtitle d-block mb-sm-5 col-12 mt-3">Тести для учнів</p>
              </div>
              <div className="col-12 text-center">
                <img class="d-inline-block w-50" src="../images/quiz_extraverted.png" alt="First slide" />
                <img class="d-inline-block w-50" src="../images/quiz_feeling.png" alt="Second slide" />
                <img class="d-inline-block w-50" src="../images/quiz_introverted.png" alt="Third slide" />
                <img class="d-inline-block w-50" src="../images/quiz_intuitive.png" alt="Third slide" />
                <img class="d-inline-block w-50" src="../images/quiz_observant.png" alt="Third slide" />
                <img class="d-inline-block w-50" src="../images/quiz_thinking.png" alt="Third slide" />
              </div>
            </div>
          </div>
        </div>
      );
    }
}

import React, { Component } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./CreditModal.scss";
import { Link } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
export default class CreditModal extends Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };
  
 
  
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <div
          className="CreditModal modal fade bd-example-modal-lg"
          id="CreditModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thanh toán</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div id="PaymentForm">
                  <div className="row">
                    <div className="credit-card col-md-6 col-sm-12 mb-2">
                      <Cards
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                      />
                    </div>
                    <div className="info-card col-md-6 col-sm-12">
                      <form className="info-form">
                        <div className="textb">
                          <input
                            type="tel"
                            name="number"
                            className="w-100"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            onBlur={this.validate}
                          />
                          <div className="cardnum">Card Number</div>
                          <div style={{ fontSize: 12, color: "red" }} className='Error' >{this.state.numberError}</div>
                        </div>
                        <div className="row">
                          <div className="col-6" style={{ paddingRight: 0 }}>
                            <div className="textb">
                              <input
                                type="tel"
                                name="expiry"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                              />
                              <div className="valid">Valid</div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="textb">
                              <input
                                type="tel"
                                name="cvc"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                              />
                              <div className="cvc">CVC</div>
                            </div>
                          </div>
                        </div>

                        <div className="textb">
                          <input
                            type="text"
                            name="name"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                          <div className="name">Name</div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                className="modal-footer"
                // to={'/donebook'}
                >
                <button
                  type="button"
                  className="btn-style draw-border"
                  onClick={() => {
                    
                    
                      this.props.datVe();
                   
                    
                    // alert('Đặt vé thành công, chúc bạn xem phim vui vẻ.')
                  }}
                >
                  Đặt vé
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

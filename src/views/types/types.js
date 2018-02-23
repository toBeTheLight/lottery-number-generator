import React, { Component } from 'react';
import { WhiteSpace, WingBlank } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './types.css'

export default class Index extends Component {
  render() {
    return (
      <WingBlank className="types">
        <Link to="/types/seven-star">
        <div className="types-item types-seven-star">体彩七星彩</div>
        </Link>
        <WhiteSpace />
        <Link to="/types/double-chromosphere">
        <div className="types-item types-double-chromosphere">福彩双色球</div>
        </Link>
        <WhiteSpace />        
      </WingBlank>
    );
  }
}
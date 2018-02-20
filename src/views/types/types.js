import React, { Component } from 'react';
import { WhiteSpace, WingBlank } from 'antd-mobile'
import './types.css'

export default class Index extends Component {
  render() {
    return (
      <WingBlank className="types">
        <div className="types-item types-seven-star">类型一</div><WhiteSpace />
        <div className="types-item types-double-chromosphere">类型二</div><WhiteSpace />        
      </WingBlank>
    );
  }
}
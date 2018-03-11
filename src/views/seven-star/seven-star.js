import React, { Component } from 'react';
import { Checkbox } from 'antd-mobile';
import { BackHeader } from '../../components'
import { randomNum } from '../../utils'
import './seven-star.css'

const CheckboxItem = Checkbox.CheckboxItem;
const value = new Array(7).fill('')
const lock = new Array(7).fill(false)

export default class Index extends Component {
  constructor () {
    super()
    this.state = {
      typeName: 'SEVEN_STAR',
      length: 7,
      value: value,
      lock: lock,
      cache: [1, 2]
    }
  }
  setValue (event, index) {
    let inputValue = event.target.value
    if (isNaN(+inputValue)) {
      return
    } else {
      let tempValue = this.state.value
      tempValue[index] = inputValue
      this.setState({
        value: tempValue
      })
    }
  }
  selectLock (index) {
    let tempLock = this.state.lock
    tempLock[index] = !tempLock[index]
    this.setState({
      lock: tempLock
    })
  }
  clear () {
    let tempValue = this.state.value
    let tempLock = this.state.lock
    this.setState({
      lock: tempLock.fill(false),
      value: tempValue.fill('')
    })
  }
  make () {
    var tempValue = this.state.value
    let length = this.state.length
    for(let i = 0; i < length; i++) {
      if (this.state.lock[i] !== true) {
        tempValue.splice(i, 1, randomNum('0-9'))
      }
    }
    this.setState({
      value: tempValue
    })
  }
  save () {
    let tempValue = this.state.value
    if (!tempValue.every(el => {
      console.log(el !== '')
      return el !== ''
    })) {
      alert('当前号码不合格')
      return
    }
    let tempString = tempValue.join(' ')
    let tempCache = this.state.cache
    if (tempCache.indexOf(tempString) >=0 ) {
      alert('当前号码已存在')
      return
    }
    tempCache.push(tempString)
    this.setState({
      cache: tempCache
    })
    window.localStorage.setItem(this.state.typeName, JSON.stringify(tempCache))
  }
  deleteCache (index) {
    console.log(index)
    let tempCache = this.state.cache
    tempCache.splice(index, 1)
    this.setState({
      cache: tempCache
    })
    window.localStorage.setItem(this.state.typeName, JSON.stringify(tempCache))  
  }
  componentWillMount () {
    let tempCache = JSON.parse(window.localStorage.getItem(this.state.typeName)) || []
    this.setState({
      cache: tempCache
    })  
  }
  render() {
    // 号码部分
    const numberPart = this.state.value.map((item, index) => {
      return (
        <li key={index} className="number-item">
          <input type="text" maxLength="1"
          onChange={(event) => {this.setValue(event, index)}}
          value={this.state.value[index]}/>
        <CheckboxItem type="checkbox"
          onChange={() => {this.selectLock(index)}}
          checked={this.state.lock[index]}/>
        </li>
      )
    })
    // 存储部分
    const cachePart = this.state.cache.length !== 0 && this.state.cache.map((item, index) => {
      return (
        <li key={index}><span>{item} </span><button onClick={() => {this.deleteCache(index)}}>删除</button></li>
      )
    })
    let cacheShow = {
      display: 'block'
    }
    if (this.state.cache.length === 0) {
      cacheShow.display = 'none'
    }
    return (
      <div className="sevenstar-container">
        <BackHeader name="体彩七星彩"/>
        <div className="part-num">
          <ul className="number-items">
            {numberPart}
          </ul>
          <div className="btns-func">
            <button type="primary" className="btn-clear" size="large" onClick={() => {this.clear()}}>清除</button>
            <button type="primary" className="btn-save" size="large" onClick={() => {this.save()}}>保存</button>
            <button type="primary" className="btn-make" size="large" onClick={() => {this.make()}}>生成</button>          
          </div>
        </div>
        <div style={cacheShow} className="part-cache">
          <h4>已存储号码</h4>
          {cachePart}
        </div>
      </div>
    );
  }
}
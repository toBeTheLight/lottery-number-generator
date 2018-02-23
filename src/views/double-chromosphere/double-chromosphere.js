/* 规则
 * 1-6 为1-33
 * 7 为 1-16
 */
import React, { Component } from 'react';
import { Checkbox } from 'antd-mobile';
import { BackHeader } from '../../components'
import { randomNum } from '../../utils'
import './double-chromosphere.css'

const CheckboxItem = Checkbox.CheckboxItem;
const value = new Array(7).fill('')
const lock = new Array(7).fill(false)

export default class Index extends Component {
  constructor () {
    super()
    this.state = {
      typeName: 'DOUBLE_CHROMOSPHERE',
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
      if (index === 6) {
        if (inputValue > 16) {
          return
        }
      } else {
        if (inputValue > 33) {
          return
        }
      }
      let tempValue = this.state.value
      tempValue[index] = Number(inputValue)
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
    let tempValue = this.state.value
    let length = this.state.length
    let haveArr = []
    for(let i = 0; i < length; i++) {
      if (this.state.lock[i] === true && i !== 6 ) {
        haveArr.push(Number(this.state.value[i]))
      }
    }
    for(let i = 0; i < length; i++) {
      if (this.state.lock[i] !== true) {
        if (i === 6) {
          tempValue.splice(i, 1, randomNum('1-16'))          
        } else {
          let tempNum = randomNum('1-33')
          while(haveArr.indexOf(tempNum) >= 0) {
            tempNum = randomNum('1-33')
          }
          haveArr.push(tempNum)
          tempValue.splice(i, 1, tempNum)
        }
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
    let i = 0, tempObj = {}, flag = false
    for (; i < this.state.value.length - 1; i++) {
      if (tempObj[this.state.value[i]]) {
        flag = true
        break
      } else {
        tempObj[this.state.value[i]] = true
      }
    }
    if (flag) {
      alert('当前号码有重复')
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
    localStorage.setItem(this.state.typeName, JSON.stringify(tempCache))
  }
  deleteCache (index) {
    console.log(index)
    let tempCache = this.state.cache
    tempCache.splice(index, 1)
    this.setState({
      cache: tempCache
    })
    localStorage.setItem(this.state.typeName, JSON.stringify(tempCache))  
  }
  componentWillMount () {
    let tempCache = JSON.parse(localStorage.getItem(this.state.typeName)) || []
    this.setState({
      cache: tempCache
    })  
  }
  render() {
    // 号码部分
    const numberPart = this.state.value.map((item, index) => {
      return (
        <li key={index} className="number-item">
          <input type="text" maxLength="2"
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
      <div className="doublechromosphere-container">
        <BackHeader name="福彩双色球"/>
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
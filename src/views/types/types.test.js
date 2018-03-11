import React from 'react';
import ReactDom from 'react-dom';
import Types from './types'
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import { HashRouter as Router} from 'react-router-dom'

describe('seven-star', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <Router>
        <Types />
      </Router>);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  })
})
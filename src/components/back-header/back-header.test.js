import React from 'react';
import ReactDom from 'react-dom';
import BackHeader from './back-header';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import { HashRouter as Router} from 'react-router-dom'

const div = document.createElement('div');

describe('back-header.js', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <Router>
        <BackHeader name="页面标题"/>
      </Router>
    )
    expect(renderToJson(wrapper)).toMatchSnapshot();
    const h = wrapper.find('.am-navbar-title');
    expect(h.text()).toBe('页面标题');
  });
})
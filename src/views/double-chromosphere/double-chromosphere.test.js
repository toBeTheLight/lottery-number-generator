import React from 'react';
import ReactDom from 'react-dom';
import DoubleChromosphere from './double-chromosphere';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import { HashRouter as Router} from 'react-router-dom';

describe('', () => {
  it('rdouble-chromosphere', () => {
    const wrapper = mount(
      <Router>
        <DoubleChromosphere />
      </Router>);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  })
})
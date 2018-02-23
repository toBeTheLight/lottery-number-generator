import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

class BackHeader extends Component {
  render () {
    return (
      <NavBar
      className="header"
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
      >{this.props.name}</NavBar>
    )
  }
}

export default withRouter(BackHeader)
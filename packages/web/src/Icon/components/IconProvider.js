// @flow

import { Component, Children, type Node } from 'react';
import PropTypes from 'prop-types';

type Props = {
  icon: object,
  children: Node,
}

class IconProvider extends Component<Props> {
  static childContextTypes = {
    icon: PropTypes.object.isRequired,
  }

  getChildContext() {
    const { icon } = this.props;
    return { icon };
  }

  render() {
    if (!this.props.children) {
      return null;
    }
    return Children.only(this.props.children);
  }
}

export default IconProvider;

/**
 * @flow
 * Copyright © 2018 Galaxy Software Services https://github.com/GSS-FED/vital-ui-kit-react
 * MIT license
 */

import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { rgba } from 'polished';

import CheckboxGroup from './CheckboxGroup';
import Icon from '../Icon';

const Root = styled.label`
  font-size: 15px;
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    > span:first-child {
      box-shadow: ${`0 0 0 2px ${({ theme }) =>
        rgba(theme.primary, 0.2)}`};
    }
  }
`;
const Label = styled.span`
  color: ${props => props.theme.primaryList[6]};
`;

const Box = styled.span`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: 1.066rem;
  height: 1.066rem;
  border: ${({ theme }) => `1px solid ${theme.primaryList[3]}`};
  border-radius: ${props => (props.isRound ? '50%' : '2px')};
  background-color: ${({ isChecked, isRound, theme }) =>
    isChecked && isRound ? theme.primary : theme.white};
  transition: all 120ms ease-out;
  margin: -2px 0.6em 0 0;
  vertical-align: middle;

  border-color: ${({ isChecked, theme }) =>
    isChecked ? theme.primary : ''};
`;

const Input = styled.input`
  display: none;
`;

const IconWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  position: relative;
  opacity: ${({ isChecked }) => (isChecked ? 1 : 0)};
  transform: ${({ isChecked }) =>
    isChecked ? 'scale(1)' : 'scale(0)'};
  pointer-events: none;
  transition: all 120ms ease-out;
`;

type State = {
  isChecked: boolean
};

type Props = {
  /** Checkbox is checked at start if true */
  initiallyChecked?: boolean,
  /** Disabled checkbox */
  isDisabled?: boolean,
  /** Round style */
  isRound?: boolean,
  /** Label text after the checkbox */
  label: string,
  /** Html name attribute */
  name: string,
  /** Value of the checkbox, html value attribute */
  value: number | string,
  /** Function trigger when checkbox value changes */
  onChange: () => {},
  /** Theme */
  theme: Object
};

function iconColor(isRound, isDisabled, theme) {
  if (isDisabled) {
    return theme.primaryList[3];
  }
  if (isRound) {
    return theme.white;
  }
  return theme.primary;
}

/** @render react
 * @name Checkbox
 * @description Checkbox components with group
 * @example
 * <Checkbox.Group>
 *  <Checkbox
 *    isRound
 *    label="checkbox 1"
 *  />
 *  <Checkbox
 *    isRound
 *    label="checkbox 2"
 *  />
 *  <Checkbox
 *    isRound
 *    label="checkbox 3"
 *  />
 * </Checkbox.Group>
 */

class Checkbox extends Component<Props, State> {
  static defaultProps = {
    isChecked: false
  };

  static Group = CheckboxGroup;

  state = {
    isChecked: this.props.initiallyChecked
  };

  onChange = () => {
    const { isDisabled, onChange, name, value } = this.props;
    if (isDisabled) return;
    if (onChange) onChange(name, value);
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  };

  render() {
    const {
      label,
      initiallyChecked,
      name,
      value,
      isDisabled,
      isRound,
      theme
    } = this.props;
    return (
      <Root {...this.props}>
        <Box
          isChecked={this.state.isChecked}
          isDisabled={isDisabled}
          isRound={isRound}
        >
          <IconWrapper
            isChecked={this.state.isChecked}
            isDisabled={isDisabled}
          >
            <Icon
              name="check"
              size="12"
              color={iconColor(isRound, isDisabled, theme)}
            />
          </IconWrapper>
        </Box>
        <Label
          isChecked={this.state.isChecked}
          isDisabled={isDisabled}
        >
          <Input
            type="checkbox"
            disabled={isDisabled}
            checked={this.state.isChecked}
            defaultChecked={initiallyChecked}
            name={name}
            value={value}
            onChange={this.onChange}
          />
          {label}
        </Label>
      </Root>
    );
  }
}

export default withTheme(Checkbox);

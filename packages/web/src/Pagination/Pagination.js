/**
 * @flow
 * Copyright © 2018 Galaxy Software Services https://github.com/GSS-FED/vital-ui-kit-react
 * MIT license
 */

import * as React from 'react';
import styled from 'styled-components';

import { Button as ButtonBase } from '../Button';
import Icon from '../Icon';

const Root = styled.ul`
  font-size: 0;
`;

const Button = styled(ButtonBase)`
  font-size: 0.875rem;
`;

const ListWrapper = styled.li`
  display: inline-block;
  vertical-align: middle;
  font-size: 0.875rem;
`;

function Item({
  children,
  selected,
  onChange,
  ...props
}: {
  children: React.ReactNode,
  selected?: boolean,
  onChange: () => {}
}) {
  return (
    <ListWrapper {...props}>
      <Button subtle selected={selected} onChange={onChange}>
        {children}
      </Button>
    </ListWrapper>
  );
}

Item.defaultProps = {
  selected: false
};

type Props = {
  /** total page size */
  pageSize: number,
  /** current active page size */
  current: number,
  onChange: () => {}
};

/**
 * @render react
 * @name Pagination
 * @description display pages
 * @example
 * <Pagination
 *  pageSize={5}
 *  current={3}
 *  onChange={() => {}}
 * />
 */

const Pagination = ({ pageSize, current, onChange }: Props) => (
  <Root>
    <Item>
      First
    </Item>
    <Item>
      <Icon
        style={{ marginRight: '5px' }}
        name="chevron-left"
        size="12"
      />
      Prev
    </Item>
    {[...Array(pageSize).keys()].map(size => (
      <Item
        selected={size + 1 === current}
        key={size}
        onClick={onChange}
      >
        {size + 1}
      </Item>
    ))}
    <Item>
      Next
      <Icon
        style={{ marginLeft: '5px' }}
        name="chevron-right"
        size="12"
      />
    </Item>
    <Item>
      Last
    </Item>
  </Root>
);

export default Pagination;

import React from 'react';
import { render } from 'enzyme';

import { Menu } from './Menu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Menu />, div);
});

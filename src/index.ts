import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App/App';

const test = (a: number, b: number): number => a + b;

test(1, 1);

ReactDOM.render(React.createElement(App), document.getElementById('root'));

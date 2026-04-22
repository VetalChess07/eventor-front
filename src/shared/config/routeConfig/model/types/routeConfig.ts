import { JSX, ReactNode } from 'react';

export interface IRoute {
  path?: string;
  element?: JSX.Element;
  index?: boolean;
  onlyAnonymous?: boolean;
  children?: IRoute[];
  layout?: JSX.Element;
}
export interface INavRoute {
  path: string;
  label: string;
  onlyAnonymous?: boolean;
  isAtribute?: Record<string, string>;
  attribute?: string;
  Icon?: ReactNode;
}

import { SVGProps } from 'react';

export { default as FlagSk } from './flag-sk';
export { default as FlagUs } from './flag-us';

export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
}

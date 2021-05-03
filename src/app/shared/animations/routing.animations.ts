import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

import * as AppGlobals from 'app.globals';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 1,
          transform: 'scale(1) translateY(0)',
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      style({
        opacity: 0,
        transform: 'scale(0) translateY(100%)',
      }),
      { optional: true }
    ),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [
          animate(
            `${AppGlobals.ANIMATION_DURATION_MEDIUM} ease-out`,
            style({
              opacity: 1,
              transform: 'scale(0) translateY(-100%)',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 1 }),
          animate(
            `${AppGlobals.ANIMATION_DURATION_MEDIUM} ease-out`,
            style({
              transform: 'scale(1) translateY(0)',
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

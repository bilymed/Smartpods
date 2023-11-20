import { animate, state, style, transition, trigger } from '@angular/animations';

export const sideNavAnimation = trigger('openClose', [
  // ...
  state('open', style({
    width: '230px',
  })),
  state('closed', style({
    width: '70px',
  })),
  transition('open => closed', [
    animate('0.2s ease-in-out')
  ]),
  transition('closed => open', [
    animate('0.2s ease-in-out')
  ]),
]);

export const SideNavContentAnimation = trigger('moveContent', [
  // ...
  state('open', style({
    marginLeft: '230px',
  })),
  state('closed', style({
    marginLeft: '70px',
  })),
  transition('open => closed', [
    animate('0.2s ease-in-out')
  ]),
  transition('closed => open', [
    animate('0.2s ease-in-out')
  ]),
]);

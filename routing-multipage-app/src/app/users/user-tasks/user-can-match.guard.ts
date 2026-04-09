import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { inject } from "@angular/core";

export const userCanMatchGuard: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 0.5) return true;

    return new RedirectCommand(router.parseUrl('/unauthorized'));
};

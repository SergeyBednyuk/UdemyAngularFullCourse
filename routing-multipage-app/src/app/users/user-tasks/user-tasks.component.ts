import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterLink,
    RouterOutlet,
    RouterStateSnapshot
} from "@angular/router";

import { UsersService } from "../users.service";

@Component({
    selector: 'app-user-tasks',
    standalone: true,
    templateUrl: './user-tasks.component.html',
    styleUrl: './user-tasks.component.css',
    imports: [
        RouterOutlet,
        RouterLink
    ]
})
export class UserTasksComponent {
    userId = input.required<string>();
    userName = input.required<string>();
    // Static data from route
    message = input.required<string>();

}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
    const usersService = inject(UsersService);
    return usersService.users.find(
        u => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
};

// Page Title resolver
export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
    return resolveUserName(activatedRoute, routerState) + '\'s Tasks';
};

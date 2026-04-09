import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ResolveFn, RouterLink } from "@angular/router";
import { TaskModel } from "./Task.model";

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
    userTasks = input.required<TaskModel[]>();
    userId = input.required<string>();
    order = input<'asc' | 'desc' | undefined>();
}

export const resolveUserTasks: ResolveFn<TaskModel[]> = (
    activatedRouteSnapshot,
    routerState
) => {
    const order = activatedRouteSnapshot.queryParams['order'];
    const tasksService = inject(TasksService);
    const tasks = tasksService
        .allTasks()
        .filter(
            (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
        );

    if (order && order === 'asc') {
        tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else {
        tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
    }

    return tasks.length ? tasks : [];
};

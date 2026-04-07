import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
    userId = input.required<string>();
    // order = input<'asc' | 'desc'>();
    order?: 'asc' | 'desc';
    private tasksService = inject(TasksService);
    private activatedRoute = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);
    userTasks = computed(() =>
        this.tasksService.allTasks()
            .filter((u) => u.userId === this.userId())
            .sort((a, b) => {
                if (this.order === 'desc') {
                    return a.id > b.id ? -1 : 1
                } else {
                    return a.id > b.id ? 1 : -1
                }
            })
    );

    ngOnInit() {
        const subscription = this.activatedRoute.queryParams.subscribe({
            next: params => {
                this.order = params['order'];
            }
        })

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
}

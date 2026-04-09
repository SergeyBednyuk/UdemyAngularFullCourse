import { Routes } from "@angular/router";

import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";
import { resolveTitle, resolveUserName } from "./user-tasks/user-tasks.component";
import { canLeaveEditPageGuard } from "../tasks/new-task/can-leave-edit-page.guard";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
        title: 'Welcome'
    },
    {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        // Trigger that force to work resolvers
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
        resolve: {
            userTasks: resolveUserTasks,
        },
        // Title resolver
        title: resolveTitle
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        // Guard that prevent leaving the page
        canDeactivate: [canLeaveEditPageGuard]
    },
];
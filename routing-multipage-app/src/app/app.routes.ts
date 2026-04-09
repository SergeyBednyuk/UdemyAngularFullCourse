import { Routes } from "@angular/router";

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from './users/users.routes';
import { userCanMatchGuard } from "./users/user-tasks/user-can-match.guard";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },
    {
        path: 'users/:userId', //<domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [userCanMatchGuard],
        data: {
            message: 'Hello!' // Static data in route
        },
        // Resolvers
        resolve: {
            userName: resolveUserName
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]
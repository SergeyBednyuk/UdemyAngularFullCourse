import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { routes } from "./add.routs";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding())
    ]
}
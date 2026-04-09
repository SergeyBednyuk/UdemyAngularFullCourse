import { CanDeactivateFn } from '@angular/router';
import { NewTaskComponent } from "./new-task.component";

export const canLeaveEditPageGuard: CanDeactivateFn<NewTaskComponent> = (component, currentRoute, currentState, nextState) => {
    if (component.submitted) return true;
    if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
        return window.confirm('Do you really want to leave?');
    }
    return true;
};

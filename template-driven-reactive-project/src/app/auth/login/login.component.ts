import { Component } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [
        FormsModule
    ]
})
export class LoginComponent {
    onSubmit(formData: NgForm) {
        if (formData.form.invalid ){
            return;
        }

        const enteredEmail =  formData.form.value.emailInpt;
        const enteredPassword =  formData.form.value.psswrdInpt;

        console.log(formData.form.status);
        console.log(formData.form);
        console.log('EMAIL:' + enteredEmail);
        console.log('PASSWORD:' + enteredPassword);
    }
}

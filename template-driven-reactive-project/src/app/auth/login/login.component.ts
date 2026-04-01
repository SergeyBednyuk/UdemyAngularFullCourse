import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { of } from "rxjs";

function mustContainsQuestionMark(control: AbstractControl) {
    if (control.value.includes('?')) {
        return null;
    }
    return { doesNotContainQuestionMark: true };
}

function isEmailUnique(control: AbstractControl) {
    if (control.value !== 'test@example.com') {
        return of(null);
    }
    return of({ IsEmailUnique: false });
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    myForm = new FormGroup({
        myEmail: new FormControl('', {
            validators: [Validators.required, Validators.email],
            asyncValidators: [isEmailUnique]
        }),
        myPassword: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6), mustContainsQuestionMark]
        })
    });

    get EmailIsValid() {
        return (
            this.myForm.controls.myEmail.touched &&
            this.myForm.controls.myEmail.dirty &&
            this.myForm.controls.myEmail.invalid
        );
    }

    get PasswordIsValid() {
        return (
            this.myForm.controls.myPassword.touched &&
            this.myForm.controls.myPassword.dirty &&
            this.myForm.controls.myPassword.invalid
        );
    }

    onSubmit() {
        console.log(this.myForm);
        const email = this.myForm.value.myEmail;
        const password = this.myForm.controls.myPassword.value;
        console.log(email);
        console.log(password);
    }
}
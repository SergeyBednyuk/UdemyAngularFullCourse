import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { debounceTime, of } from "rxjs";

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
export class LoginComponent implements OnInit {
    private destroyRef = inject(DestroyRef);

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

    ngOnInit() {
        const savedForm = window.localStorage.getItem('saved-login-form');
        if (savedForm) {
            const loadedForm = JSON.parse(savedForm);
            this.myForm.patchValue({
                myEmail: loadedForm.email
            });
        }

        var subscription = this.myForm.valueChanges.pipe(debounceTime(500)).subscribe({
            next: value =>
                window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.myEmail }))
        });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    onSubmit() {
        console.log(this.myForm);
        const email = this.myForm.value.myEmail;
        const password = this.myForm.controls.myPassword.value;
        console.log(email);
        console.log(password);

        this.myForm.reset();
    }
}
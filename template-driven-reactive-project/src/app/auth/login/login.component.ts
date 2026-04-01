import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { debounceTime } from "rxjs";

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
    private form = viewChild.required<NgForm>('form');
    private destroyRef = inject(DestroyRef);

    constructor() {
        const savedForm = window.localStorage.getItem('saved-login-form');

        if (savedForm) {
            const loadedFormData = JSON.parse(savedForm);
            const savedEmail = loadedFormData.email;
            setTimeout(() => {
                this.form().controls['emailInpt'].setValue(savedEmail);
            }, 5);
        }

        afterNextRender(() => {
            const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
                next: (value) =>
                    window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.emailInpt }))
            });

            this.destroyRef.onDestroy(() => subscription?.unsubscribe());
        });
    }


    onSubmit(formData: NgForm) {
        if (formData.form.invalid) {
            return;
        }

        const enteredEmail = formData.form.value.emailInpt;
        const enteredPassword = formData.form.value.psswrdInpt;

        console.log(formData.form.status);
        console.log(formData.form);
        console.log('EMAIL:' + enteredEmail);
        console.log('PASSWORD:' + enteredPassword);

        formData.form.reset();
    }
}

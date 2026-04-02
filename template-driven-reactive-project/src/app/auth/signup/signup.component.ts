import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

function equalValues(controlName1: string, controlName2: string) {
    return (control: AbstractControl) => {
        const val1 = control.get(controlName1)?.value
        const val2 = control.get(controlName2)?.value;

        if (val1 === val2) {
            return null;
        }

        return { valuesNotEqual: false };
    }
}

@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
    imports: [
        ReactiveFormsModule
    ]
})
export class SignupComponent {
    private destroyRef = inject(DestroyRef);

    sForm = new FormGroup({
        emailCtrl: new FormControl('', {
            validators: [Validators.email, Validators.required]
        }),
        passwordsGrp: new FormGroup({
            passCtrl: new FormControl('', {
                validators: [Validators.required, Validators.minLength(6)]
            }),
            confPassCtrl: new FormControl('', {
                validators: [Validators.required, Validators.minLength(6)]
            })
        }, {
            validators: [equalValues('emailCtrl', 'confPassCtrl')]
        }),
        firstName: new FormControl('', {
            validators: [Validators.required]
        }),
        lastName: new FormControl('', {
            validators: [Validators.required]
        }),
        addressGrp: new FormGroup({
            street: new FormControl('', {
                validators: [Validators.required]
            }),
            number: new FormControl('', {
                validators: [Validators.required]
            }),
            postCode: new FormControl('', {
                validators: [Validators.required]
            }),
            city: new FormControl('', {
                validators: [Validators.required]
            })
        }),
        role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
            validators: [Validators.required]
        }),
        sources: new FormArray([
            new FormControl(false),
            new FormControl(false),
            new FormControl(false)
        ]),
        agree: new FormControl(false, {
            validators: [Validators.required]
        })
    });

    get isPasswordPartValid() {
        const passwordsGrp = this.sForm.controls.passwordsGrp;
        return (
            passwordsGrp.controls.passCtrl.touched &&
            passwordsGrp.controls.passCtrl.dirty &&
            passwordsGrp.controls.passCtrl.valid &&
            passwordsGrp.controls.confPassCtrl.touched &&
            passwordsGrp.controls.confPassCtrl.dirty &&
            !passwordsGrp.hasError('passwordsMatch')
        );
    }

    onSubmit() {
        if (this.sForm.invalid) {
            console.log(this.sForm.errors);
            return;
        }
        console.log(this.sForm);
    }

    onReset() {
        this.sForm.reset();
    }
}

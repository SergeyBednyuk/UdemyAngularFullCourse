import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    private destroyerRef = inject(DestroyRef);
    clickCount = signal(0);
    clickCount$ = toObservable(this.clickCount);
    interval$ = interval(1000);
    intervalSignal = toSignal(this.interval$, { initialValue: 0 });

    constructor() {
        // effect(() => {
        //    console.log(`Click count: ${this.clickCount()} times.`);
        // });
        // toObservable(this.clickCount);


    }

    ngOnInit() {
        // const subscription = interval(10000).pipe(
        //     map((value) => value * 2)
        // ).subscribe({
        //     next: value => console.log(value),
        //     complete: () => {
        //         console.log('Interval is completed')
        //     },
        //     error: err => console.log(err)
        // });
        //
        // this.destroyerRef.onDestroy(() => {
        //     subscription.unsubscribe();
        // });
        const subscription = this.clickCount$.subscribe({
            next: value => console.log(`Click count: ${this.clickCount()} times.`)
        });

        this.destroyerRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }

    onClick() {
        this.clickCount.update((oldVal) => oldVal + 1);
    }
}

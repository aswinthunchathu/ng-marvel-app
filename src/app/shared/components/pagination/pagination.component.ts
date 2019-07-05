import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core'
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
            ]),
            transition(':leave', [animate('200ms ease-in', style({ transform: 'translateX(100%)' }))]),
        ]),
    ],
})
export class PaginationComponent implements OnInit, OnDestroy {
    /*
        component props
    */
    @Input() total = 0
    @Input() current = 0
    @Output() hideEvent: EventEmitter<void> = new EventEmitter()

    private hideTimeout

    constructor() {}

    ngOnInit() {
        this.hideTimeout = setTimeout(() => {
            this.hideEvent.emit()
        }, 5000)
    }

    ngOnDestroy() {
        /*
            Clear timeout when component is destroyed
        */
        clearTimeout(this.hideTimeout)
    }
}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core'
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
    selector: 'app-page-info',
    templateUrl: './page-info.component.html',
    styleUrls: ['./page-info.component.scss'],
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
export class PageInfoComponent implements OnInit, OnDestroy {
    @Input() showCondition: boolean
    @Input() total = 0
    @Input() current = 0
    @Input() hideAfter = 5000
    @Output() hideEvent: EventEmitter<void> = new EventEmitter()
    private hideTimeout

    constructor() {}

    ngOnInit() {
        this.hideTimeout = setTimeout(() => this.hideEvent.emit(), +this.hideAfter)
    }

    ngOnDestroy() {
        clearTimeout(this.hideTimeout)
    }
}

import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'app-error-handler',
    templateUrl: './error-handler.component.html',
    styleUrls: ['./error-handler.component.scss'],
})
export class ErrorHandlerComponent implements OnInit {
    @Input() hasError: boolean
    @Input() message = ' Some error occurred. Please try later.'
    @Input() type: 'error' | 'error-text-only' = 'error'

    constructor() {}

    ngOnInit() {}
}

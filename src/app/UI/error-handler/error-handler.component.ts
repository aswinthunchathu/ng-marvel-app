import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'app-error-handler',
    templateUrl: './error-handler.component.html',
    styleUrls: ['./error-handler.component.scss'],
})
export class ErrorHandlerComponent implements OnInit {
    @Input() hasError: boolean

    constructor() {}

    ngOnInit() {}
}

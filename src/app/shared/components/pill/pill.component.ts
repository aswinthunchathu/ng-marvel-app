/*
    This component renders a pill view
*/
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-pill',
    template: `
        <div class="pill">
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['./pill.component.scss'],
})
export class PillComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

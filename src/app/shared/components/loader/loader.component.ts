/*
    This component renders a spinner
*/
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-loader',
    template: `
        <div class="loader">
            <img class="loader--image" src="assets/loader.gif" alt="loading..." />
        </div>
    `,
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

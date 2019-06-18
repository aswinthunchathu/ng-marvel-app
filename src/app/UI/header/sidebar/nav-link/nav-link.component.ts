import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'app-nav-link',
    template: `
        <a class="nav-link" routerLinkActive="active" [routerLink]="link">
            <ng-content></ng-content>
        </a>
    `,
    styleUrls: ['./nav-link.component.scss'],
})
export class NavLinkComponent implements OnInit {
    @Input() link: string

    constructor() {}

    ngOnInit() {}
}

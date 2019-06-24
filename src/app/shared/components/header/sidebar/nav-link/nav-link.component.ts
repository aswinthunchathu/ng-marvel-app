import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-nav-link',
    template: `
        <a class="nav-link" routerLinkActive="active" [routerLink]="link">
            <ng-content></ng-content>
            <span class="nav-link--styler"></span>
        </a>
    `,
    styleUrls: ['./nav-link.component.scss'],
})
export class NavLinkComponent {
    @Input() link: string

    constructor() {}
}

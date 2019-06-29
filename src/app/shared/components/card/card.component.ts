/*
    This component renders a card view with a title and image
*/
import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input() title: string
    // tslint:disable-next-line:no-input-rename
    @Input('image-src') src: string
    // tslint:disable-next-line:no-input-rename
    @Input('animated-card') animated = false
    // tslint:disable-next-line:no-input-rename
    @Input('floating-label') floatingLabel = true
    // tslint:disable-next-line:no-input-rename
    @Input('placeholder-image-src') placeholderImage?: string

    constructor() {}

    ngOnInit() {}
}

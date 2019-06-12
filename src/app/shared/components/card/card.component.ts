import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input('title') title: string
    @Input('image-src') src: string
    @Input('animated-card') animated?: boolean = false
    @Input('floating-label') floatingLabel?: boolean = true
    @Input('placeholder-image-src') placeholderImage?: string

    constructor() {}

    ngOnInit() {}
}

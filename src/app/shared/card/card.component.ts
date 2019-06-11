import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    title: string = 'test'
    src: string = 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg'

    constructor() {}

    ngOnInit() {}
}

import { Component } from '@angular/core'
import { COMPONENT_TYPE } from '../list-view/map'

@Component({
    selector: 'app-comics',
    template: '<app-list-view [type]="type"></app-list-view>',
})
export class ComicsComponent {
    type = COMPONENT_TYPE.comics
}

import { Component } from '@angular/core'
import { COMPONENT_TYPE } from '../list-view/map'

@Component({
    selector: 'app-characters',
    template: '<app-list-view [type]="type"></app-list-view>',
})
export class CharactersComponent {
    type = COMPONENT_TYPE.characters
}

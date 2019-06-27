import { Component, Input } from '@angular/core'
import { COMPONENT_TYPE } from '../list-view/map'

@Component({
    selector: 'app-series',
    template: '<app-list-view [type]="type"></app-list-view>',
})
export class SeriesComponent {
    type = COMPONENT_TYPE.series
}

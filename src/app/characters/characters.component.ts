import { Component, OnInit } from '@angular/core'
import { COMPONENT_TYPE, FILTER_TYPE, Filter } from '../list/list.metadata'
import { ActivatedRoute } from '@angular/router'
import { ImageType } from '../shared/model/image-generator.model'

@Component({
    selector: 'app-characters',
    template: `
        <app-list
            [filter]="filter"
            [type]="type"
            [infinityScroll]="true"
            [withPagination]="true"
            [isAnimated]="true"
            [isFloatingLabel]="true"
            [spacedItems]="false"
            [imageType]="imageType"
        ></app-list>
    `,
})
export class CharactersComponent implements OnInit {
    type = COMPONENT_TYPE.characters
    filter: Filter
    imageType = ImageType.standard

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        const { key } = this.route.snapshot.queryParams
        if (key) {
            this.filter = {
                type: FILTER_TYPE.byTitle,
                value: key,
            }
        }
    }
}

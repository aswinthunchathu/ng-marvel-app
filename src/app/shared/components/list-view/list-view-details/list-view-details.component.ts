import { Component, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'

import { ListDetailsModel } from './list-details.model'
import { BgService } from '../../../../shared/services/bg.service'

@Component({
    selector: 'app-list-view-details',
    templateUrl: './list-view-details.component.html',
    styleUrls: ['./list-view-details.component.scss'],
})
export class ListViewDetailsComponent implements OnChanges, OnDestroy {
    @Input() isBgImage: false
    @Input() hasError: boolean
    @Input() loading: boolean
    @Input() item: ListDetailsModel

    constructor(private bgService: BgService, private router: Router) {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.item && this.isBgImage) {
            this.bgService.setBgImage(this.item.image)
        }
    }

    ngOnDestroy() {
        if (this.isBgImage) {
            this.bgService.setBgImage('')
        }
    }
}

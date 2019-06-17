import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { ListDetailsModel } from './list-details.model'
import { BgService } from 'src/app/shared/services/bg.service'

@Component({
    selector: 'app-list-details',
    templateUrl: './list-details.component.html',
    styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit, OnDestroy {
    @Input() item: ListDetailsModel
    @Input() withBgImage: boolean = false
    @Input() bgImage: string = ''
    @Input() loading: boolean

    constructor(private bgService: BgService) {}

    ngOnInit() {
        if (this.withBgImage) {
            this.bgService.setBgImage(this.bgImage)
        }
    }

    ngOnDestroy() {
        if (this.withBgImage) {
            this.bgService.setBgImage('')
        }
    }
}

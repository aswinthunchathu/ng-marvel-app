import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { DomSanitizer } from '@angular/platform-browser'

import { BgService } from './shared/services/bg.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    bgSub: Subscription
    bgImage: any

    constructor(private bgService: BgService, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.bgSub = this.bgService.bgImageSub.subscribe(() => {
            this.bgImage = this.sanitizer.bypassSecurityTrustStyle(this.bgService.getBgImage())
        })
    }

    ngOnDestroy() {
        this.bgSub.unsubscribe()
    }
}

/*
    This service sets background image for app-details component
*/

import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BgService {
    private bgImage = ''
    bgImageSub = new Subject<void>()

    constructor() {}

    setBgImage(url: string) {
        this.bgImage = `url(${url})`
        this.bgImageSub.next()
    }

    getBgImage() {
        return this.bgImage
    }
}

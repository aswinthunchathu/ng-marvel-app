/*
    This directive takes a 'placeholder image' and an 'actual image'
    urls, and show the placeholder image initially then switch to the actual image
    once the actual image is loaded
*/

import { Directive, HostBinding, Input, OnInit } from '@angular/core'

@Directive({
    selector: '[appProgressiveImageLoading]',
})
export class ProgressiveImageLoadingDirective implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('appProgressiveImageLoading-placeholder') placeholder: string
    // tslint:disable-next-line:no-input-rename
    @Input('appProgressiveImageLoading') image: string
    // tslint:disable-next-line:no-input-rename
    @Input('class') cssClass: string
    @HostBinding('attr.src') bgImage: string
    @HostBinding('class') newCssClass: string

    constructor() {}

    ngOnInit() {
        /*
            If placeholder image is not provided,
            default placeholder image will be used
        */
        if (this.placeholder) {
            this.newCssClass = `${this.cssClass} blur`
            this.bgImage = this.placeholder
        } else {
            this.newCssClass = `${this.cssClass} default-loader`
            this.bgImage = 'assets/image-placeholder.gif'
        }
        this.loadActualImage()
    }

    /*
         Loading the actual image
    */
    loadActualImage() {
        let actualImage = new Image()
        actualImage.src = this.image
        actualImage.onload = () => {
            this.newCssClass = this.cssClass
            this.bgImage = this.image
            actualImage = null
        }

        actualImage.onerror = () => {
            if (this.placeholder) {
                this.newCssClass = this.cssClass
            }
            actualImage = null
        }
    }
}

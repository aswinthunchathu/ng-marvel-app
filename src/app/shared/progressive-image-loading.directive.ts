import { Directive, HostBinding, Input, OnInit } from '@angular/core'

@Directive({
    selector: '[appProgressiveImageLoading]',
})
export class ProgressiveImageLoadingDirective implements OnInit {
    //add a default image here
    @Input('appProgressiveImageLoading-placeholder') placeholder: string
    @Input('appProgressiveImageLoading') image: string
    @HostBinding('style.backgroundImage') bgImage: string

    constructor() {}

    ngOnInit() {
        this.bgImage = `url(${this.placeholder})`
        this.loadActualImage()
    }

    loadActualImage() {
        const actualImage = new Image()
        actualImage.src = this.image
        // actualImage.onload = () => {
        //     this.bgImage = `url(${this.image})`
        // }
    }
}

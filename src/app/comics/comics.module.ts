import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'
import { ComicsComponent } from './comics.component'
import { ComicDetailsComponent } from './comic-details/comic-details.component'
import { ComicsRouteModule } from './comics-route.module'

@NgModule({
    declarations: [ComicsComponent, ComicDetailsComponent],
    imports: [CommonModule, SharedModule, ComicsRouteModule],
    exports: [ComicsComponent, ComicDetailsComponent],
})
export class ComicsModule {}

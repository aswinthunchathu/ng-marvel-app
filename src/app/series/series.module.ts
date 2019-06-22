import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'
import { SeriesComponent } from './series.component'
import { SeriesDetailsComponent } from './series-details/series-details.component'

@NgModule({
    declarations: [SeriesComponent, SeriesDetailsComponent],
    imports: [CommonModule, SharedModule],
    exports: [SeriesComponent, SeriesDetailsComponent],
})
export class SeriesModule {}

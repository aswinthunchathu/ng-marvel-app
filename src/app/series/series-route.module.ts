import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SeriesComponent } from './series.component'
import { SeriesDetailsComponent } from './series-details/series-details.component'

const routes: Routes = [{ path: ':id', component: SeriesDetailsComponent }, { path: '', component: SeriesComponent }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SeriesRouteModule {}

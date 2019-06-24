import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ComicsComponent } from './comics.component'
import { ComicDetailsComponent } from './comic-details/comic-details.component'

const routes: Routes = [{ path: ':id', component: ComicDetailsComponent }, { path: '', component: ComicsComponent }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComicsRouteModule {}

import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component'
import { SeriesDetailsComponent } from './series/series-details/series-details.component'
import { COMPONENT_TYPE } from './list-view/map'
import { ListViewComponent } from './list-view/list-view.component'

const routes: Routes = [
    {
        path: 'series/:id',
        component: SeriesDetailsComponent,
    },
    {
        path: 'series',
        component: ListViewComponent,
        data: {
            type: COMPONENT_TYPE.series,
        },
    },
    { path: 'comics/:id', component: ComicDetailsComponent },
    {
        path: 'comics',
        component: ListViewComponent,
        data: {
            type: COMPONENT_TYPE.comics,
        },
    },
    { path: 'characters/:id', component: CharacterDetailsComponent },
    {
        path: 'characters',
        component: ListViewComponent,
        data: {
            type: COMPONENT_TYPE.characters,
        },
    },
    { path: '', redirectTo: '/characters', pathMatch: 'full' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

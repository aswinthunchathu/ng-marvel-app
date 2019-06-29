import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { COMPONENT_TYPE as ListViewType } from './list-view/list-view.metadata'
import { COMPONENT_TYPE as DetailViewType } from './list-view/details/details.metadata'
import { ListViewComponent } from './list-view/list-view.component'
import { DetailsComponent } from './list-view/details/details.component'

const routes: Routes = [
    {
        path: 'series/:id',
        component: DetailsComponent,
        data: {
            type: DetailViewType.seriesDetails,
            isBgImage: false,
            tabs: [
                {
                    title: 'Characters',
                    type: ListViewType.characters,
                },
                {
                    title: 'Comics',
                    type: ListViewType.comics,
                },
            ],
        },
    },
    {
        path: 'comics/:id',
        component: DetailsComponent,
        data: {
            type: DetailViewType.comicDetails,
            isBgImage: false,
            tabs: [
                {
                    title: 'Characters',
                    type: ListViewType.characters,
                },
            ],
        },
    },
    {
        path: 'characters/:id',
        component: DetailsComponent,
        data: {
            type: DetailViewType.characterDetails,
            isBgImage: true,
            tabs: [
                {
                    title: 'Comics',
                    type: ListViewType.comics,
                },
                {
                    title: 'Series',
                    type: ListViewType.series,
                },
            ],
        },
    },
    {
        path: 'series',
        component: ListViewComponent,
        data: {
            type: ListViewType.series,
        },
    },
    {
        path: 'comics',
        component: ListViewComponent,
        data: {
            type: ListViewType.comics,
        },
    },
    {
        path: 'characters',
        component: ListViewComponent,
        data: {
            type: ListViewType.characters,
        },
    },
    { path: '', redirectTo: '/characters', pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

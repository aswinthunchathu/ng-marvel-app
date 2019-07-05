import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ROUTE_PATHS } from './constants'
import { CharactersComponent } from './characters/characters.component'
import { SearchResultsComponent } from './search/search-results/search-results.component'
import { ComicsComponent } from './comics/comics.component'
import { SeriesComponent } from './series/series.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { SeriesDetailsComponent } from './series/series-details/series-details.component'
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component'

const routes: Routes = [
    {
        path: ROUTE_PATHS.search,
        component: SearchResultsComponent,
    },
    {
        path: `${ROUTE_PATHS.series}/:id`,
        component: SeriesDetailsComponent,
    },
    {
        path: ROUTE_PATHS.series,
        component: SeriesComponent,
    },
    {
        path: `${ROUTE_PATHS.comics}/:id`,
        component: ComicDetailsComponent,
    },
    {
        path: ROUTE_PATHS.comics,
        component: ComicsComponent,
    },
    {
        path: `${ROUTE_PATHS.characters}/:id`,
        component: CharacterDetailsComponent,
    },
    {
        path: ROUTE_PATHS.characters,
        component: CharactersComponent,
    },
    { path: '', redirectTo: `/${ROUTE_PATHS.characters}`, pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

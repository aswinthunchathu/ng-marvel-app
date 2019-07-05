import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ROUTE_PATHS } from './constants'
import { CharactersComponent } from './characters/characters.component'
import { SearchResultsComponent } from './search/search-results/search-results.component'
import { ComicsComponent } from './comics/comics.component'
import { SeriesComponent } from './series/series.component'
import { DetailsComponent as ComicDetails } from './comics/details/details.component'
import { DetailsComponent as SeriesDetails } from './comics/details/details.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'

const routes: Routes = [
    {
        path: ROUTE_PATHS.search,
        component: SearchResultsComponent,
    },
    {
        path: `${ROUTE_PATHS.series}/:id`,
        component: SeriesDetails,
    },
    {
        path: ROUTE_PATHS.series,
        component: SeriesComponent,
    },
    {
        path: `${ROUTE_PATHS.comics}/:id`,
        component: ComicDetails,
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

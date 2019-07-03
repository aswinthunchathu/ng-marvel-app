import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CharactersComponent } from './characters/characters.component'
import { SearchResultsComponent } from './search/search-results/search-results.component'
import { ROUTE_PATHS } from './constants'

const routes: Routes = [
    {
        path: ROUTE_PATHS.search,
        component: SearchResultsComponent,
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

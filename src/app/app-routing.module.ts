import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CharactersComponent } from './characters/characters.component'
import { ComicsComponent } from './comics/comics.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component'
import { SeriesComponent } from './series/series.component'
import { SeriesDetailsComponent } from './series/series-details/series-details.component'

const routes: Routes = [
    { path: 'seriesDetails/:id', component: SeriesDetailsComponent },
    { path: 'series', component: SeriesComponent },
    { path: 'comic/:id', component: ComicDetailsComponent },
    { path: 'character/:id', component: CharacterDetailsComponent },
    { path: 'comics', component: ComicsComponent },
    { path: 'characters', component: CharactersComponent },
    { path: '', redirectTo: '/characters', pathMatch: 'full' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            //scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

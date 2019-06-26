import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { CharactersComponent } from './characters/characters.component'
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component'
import { ComicsComponent } from './comics/comics.component'
import { SeriesDetailsComponent } from './series/series-details/series-details.component'
import { SeriesComponent } from './series/series.component'

const routes: Routes = [
    { path: 'series/:id', component: SeriesDetailsComponent },
    { path: 'series', component: SeriesComponent },
    { path: 'comics/:id', component: ComicDetailsComponent },
    { path: 'comics', component: ComicsComponent },
    { path: 'characters/:id', component: CharacterDetailsComponent },
    { path: 'characters', component: CharactersComponent },
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

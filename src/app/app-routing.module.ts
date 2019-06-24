import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

const routes: Routes = [
    {
        path: 'series',
        loadChildren: () => import('./series/series.module').then(mod => mod.SeriesModule),
    },
    {
        path: 'comics',
        loadChildren: () => import('./comics/comics.module').then(mod => mod.ComicsModule),
    },
    {
        path: 'characters',
        loadChildren: () => import('./characters/characters.module').then(mod => mod.CharactersModule),
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

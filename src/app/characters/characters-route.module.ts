import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CharactersComponent } from './characters.component'
import { CharacterDetailsComponent } from './character-details/character-details.component'

const routes: Routes = [
    { path: ':id', component: CharacterDetailsComponent },
    { path: '', component: CharactersComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CharactersRouteModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CharactersComponent } from './characters.component'
import { CharacterDetailsComponent } from './character-details/character-details.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
    declarations: [CharactersComponent, CharacterDetailsComponent],
    imports: [CommonModule, SharedModule],
    exports: [CharactersComponent, CharacterDetailsComponent],
})
export class CharactersRouteModule {}

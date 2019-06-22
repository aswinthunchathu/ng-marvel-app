import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CharactersComponent } from './characters.component'
import { CharacterDetailsComponent } from './character-details/character-details.component'

@NgModule({
    declarations: [CharactersComponent, CharacterDetailsComponent],
    imports: [CommonModule],
})
export class CharactersModule {}

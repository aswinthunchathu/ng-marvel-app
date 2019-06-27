import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { appReducer } from './app.reducer'
import { CharactersEffects } from '../characters/store/characters.effects'
import { CharacterEffects } from '../characters/character-details/store/character.effects'
import { ComicsEffects } from '../comics/store/comics.effects'
import { ComicEffects } from '../comics/comic-details/store/comic.effects'
import { SeriesEffects } from '../series/store/series.effects'
import { SeriesDetailsEffects } from '../series/series-details/store/series-details.effects'
import { ComicsByCharacterIdEffects } from '../comics/store/byCharacterId/comics-by-characterId.effects'
import { ComicsBySeriesIdEffects } from '../comics/store/bySeriesId/comics-by-seriesId.effects'
import { SeriesByCharacterIdEffects } from '../series/store/byCharacterId/series-by-characterId.effects'
import { CharactersByComicIdEffects } from '../characters/store/byComicId/characters-by-comicId.effects'
import { CharactersBySeriesIdEffects } from '../characters/store/bySeriesId/characters-by-seriesId.effects'
import { environment } from '../../environments/environment'

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([
            CharactersEffects,
            CharacterEffects,
            ComicsEffects,
            ComicEffects,
            SeriesEffects,
            SeriesDetailsEffects,
            ComicsByCharacterIdEffects,
            ComicsBySeriesIdEffects,
            SeriesByCharacterIdEffects,
            CharactersByComicIdEffects,
            CharactersBySeriesIdEffects,
        ]),
        StoreDevtoolsModule.instrument({
            logOnly: environment.production,
        }),
    ],
    exports: [StoreModule, EffectsModule, StoreDevtoolsModule],
})
export class AppStoreModule {}

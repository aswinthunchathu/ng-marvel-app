import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { environment } from '../../environments/environment'

import { appReducer } from './app.reducer'
import { CharactersEffects } from './characters/characters.effects'
import { CharacterEffects } from './characters/details/character.effects'
import { ComicsEffects } from './comics/comics.effects'
import { ComicEffects } from './comics/details/comic.effects'
import { SeriesEffects } from './series/series.effects'
import { SeriesDetailsEffects } from './series/details/series-details.effects'
import { ComicsByCharacterIdEffects } from './comics/byCharacterId/comics-by-characterId.effects'
import { ComicsBySeriesIdEffects } from './comics/bySeriesId/comics-by-seriesId.effects'
import { SeriesByCharacterIdEffects } from './series/byCharacterId/series-by-characterId.effects'
import { CharactersByComicIdEffects } from './characters/byComicId/characters-by-comicId.effects'
import { CharactersBySeriesIdEffects } from './characters/bySeriesId/characters-by-seriesId.effects'
import { CharactersByNameEffects } from './characters/byName/characters-by-name.effects'

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
            CharactersByNameEffects,
        ]),
        StoreDevtoolsModule.instrument({
            logOnly: environment.production,
        }),
    ],
    exports: [StoreModule, EffectsModule, StoreDevtoolsModule],
})
export class AppStoreModule {}

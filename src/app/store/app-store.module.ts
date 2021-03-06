import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { environment } from '../../environments/environment'

import { appReducer } from './app.reducer'
import { CharactersEffects } from '../characters/store/characters.effects'
import { CharacterEffects } from '../characters/store/details/character.effects'
import { ComicsEffects } from '../comics/store/comics.effects'
import { ComicEffects } from '../comics/store/details/comic.effects'
import { SeriesEffects } from '../series/store/series.effects'
import { SeriesDetailsEffects } from '../series/store/details/series-details.effects'
import { ComicsByCharacterIdEffects } from '../comics/store/byCharacterId/comics-by-characterId.effects'
import { ComicsBySeriesIdEffects } from '../comics/store/bySeriesId/comics-by-seriesId.effects'
import { SeriesByCharacterIdEffects } from '../series/store/byCharacterId/series-by-characterId.effects'
import { CharactersByComicIdEffects } from '../characters/store/byComicId/characters-by-comicId.effects'
import { CharactersBySeriesIdEffects } from '../characters/store/bySeriesId/characters-by-seriesId.effects'
import { CharactersByNameEffects } from '../characters/store/byName/characters-by-name.effects'
import { ComicsByNameEffects } from '../comics/store/byName/comics-by-name.effects'
import { SeriesByNameEffects } from '../series/store/byName/series-by-name.effects'

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
            ComicsByNameEffects,
            SeriesByNameEffects,
        ]),
        StoreDevtoolsModule.instrument({
            logOnly: environment.production,
        }),
    ],
    exports: [StoreModule, EffectsModule, StoreDevtoolsModule],
})
export class AppStoreModule {}

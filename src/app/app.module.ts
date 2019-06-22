import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CharactersComponent } from './characters/characters.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { appReducer } from './store/app.reducer'
import { environment } from '../environments/environment'
import { CharactersEffects } from './characters/store/characters.effects'
import { ApiInterceptor } from './shared/services/api-interceptor.services'
import { CharacterEffects } from './characters/character-details/store/character.effects'
import { ComicsEffects } from './comics/store/comics.effects'
import { ComicsComponent } from './comics/comics.component'
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component'
import { ComicEffects } from './comics/comic-details/store/comic.effects'
import { SeriesComponent } from './series/series.component'
import { SeriesEffects } from './series/store/series.effects'
import { SeriesDetailsComponent } from './series/series-details/series-details.component'
import { SeriesDetailsEffects } from './series/series-details/store/series-details.effects'
import { HeaderComponent } from './UI/header/header.component'
import { MaterialComponentsModule } from './shared/material-components.module'
import { ComicsByCharacterIdEffects } from './comics/store/byCharacterId/comics-by-characterId.effects'
import { ComicsBySeriesIdEffects } from './comics/store/bySeriesId/comics-by-seriesId.effects'
import { SeriesByCharacterIdEffects } from './series/store/byCharacterId/series-by-characterId.effects'
import { CharactersByComicIdEffects } from './characters/store/byComicId/characters-by-comicId.effects'
import { CharactersBySeriesIdEffects } from './characters/store/bySeriesId/characters-by-seriesId.effects'

import { SharedModule } from './shared/shared.module'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CharactersComponent,
        CharacterDetailsComponent,
        ComicsComponent,
        ComicDetailsComponent,
        SeriesComponent,
        SeriesDetailsComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        MaterialComponentsModule,
        HttpClientModule,
        AppRoutingModule,
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
        SharedModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

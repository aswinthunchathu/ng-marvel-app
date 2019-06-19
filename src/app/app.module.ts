import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { MatTab } from '@angular/material'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CardComponent } from './UI/card/card.component'
import { CharactersComponent } from './characters/characters.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { appReducer } from './store/app.reducer'
import { environment } from '../environments/environment'
import { CharactersEffects } from './characters/store/characters.effects'
import { ApiInterceptor } from './shared/services/api-interceptor.services'
import { ProgressiveImageLoadingDirective } from './shared/directives/progressive-image-loading.directive'
import { LoaderComponent } from './UI/loader/loader.component'
import { CharacterEffects } from './characters/character-details/store/character.effects'
import { ComicsEffects } from './comics/store/comics.effects'
import { SidebarComponent } from './UI/header/sidebar/sidebar.component'
import { ComicsComponent } from './comics/comics.component'
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component'
import { ComicEffects } from './comics/comic-details/store/comic.effects'
import { SeriesComponent } from './series/series.component'
import { SeriesEffects } from './series/store/series.effects'
import { SeriesDetailsComponent } from './series/series-details/series-details.component'
import { SeriesDetailsEffects } from './series/series-details/store/series-details.effects'
import { ListComponent } from './UI/list/list.component'
import { ListDetailsComponent } from './UI/list/list-details/list-details.component'
import { HeaderComponent } from './UI/header/header.component'
import { NavLinkComponent } from './UI/header/sidebar/nav-link/nav-link.component'
import { MaterialComponentsModule } from './shared/material-components.module'
import { ComicsByCharacterIdEffects } from './comics/store/byCharacterId/comics-by-characterId.effects'
import { ComicsBySeriesIdEffects } from './comics/store/bySeriesId/comics-by-seriesId.effects'
import { SeriesByCharacterIdEffects } from './series/store/byCharacterId/series-by-characterId.effects'

@NgModule({
    declarations: [
        AppComponent,
        CardComponent,
        CharactersComponent,
        CharacterDetailsComponent,
        ProgressiveImageLoadingDirective,
        LoaderComponent,
        SidebarComponent,
        ComicsComponent,
        ComicDetailsComponent,
        SeriesComponent,
        SeriesDetailsComponent,
        ListComponent,
        ListDetailsComponent,
        HeaderComponent,
        NavLinkComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        MaterialComponentsModule,
        HttpClientModule,
        AppRoutingModule,
        InfiniteScrollModule,
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
        ]),
        StoreDevtoolsModule.instrument({
            logOnly: environment.production,
        }),
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

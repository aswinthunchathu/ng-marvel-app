import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CardComponent } from './shared/components/card/card.component'
import { CharactersComponent } from './characters/characters.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { appReducer } from './store/app.reducer'
import { environment } from '../environments/environment'
import { CharactersEffects } from './characters/store/characters.effects'
import { ApiInterceptor } from './shared/services/api-interceptor.services'
import { ProgressiveImageLoadingDirective } from './shared/directives/progressive-image-loading.directive'
import { LoaderComponent } from './shared/components/loader/loader.component'
import { CharacterEffects } from './characters/character-details/store/character.effects'

@NgModule({
    declarations: [
        AppComponent,
        CardComponent,
        CharactersComponent,
        CharacterDetailsComponent,
        ProgressiveImageLoadingDirective,
        LoaderComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        InfiniteScrollModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([CharactersEffects, CharacterEffects]),
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

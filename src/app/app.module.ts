import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CardComponent } from './shared/card/card.component'
import { CharactersComponent } from './characters/characters.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { appReducer } from './store/app.reducer'
import { environment } from '../environments/environment'
import { CharactersEffects } from './characters/store/characters.effects'
import { ApiInterceptor } from './shared/api-interceptor.services'

@NgModule({
    declarations: [AppComponent, CardComponent, CharactersComponent, CharacterDetailsComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([CharactersEffects]),
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

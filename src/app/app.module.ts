import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CardComponent } from './shared/card/card.component';
import { CharactersComponent } from './characters/characters.component'

@NgModule({
    declarations: [AppComponent, CardComponent, CharactersComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

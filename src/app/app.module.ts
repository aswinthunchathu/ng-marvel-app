import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'

import { NavLinkComponent } from './header/sidebar/nav-link/nav-link.component'
import { SidebarComponent } from './header/sidebar/sidebar.component'
import { HeaderComponent } from './header/header.component'
import { AppStoreModule } from './store/app-store.module'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { CharactersComponent } from './characters/characters.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { ComicsComponent } from './comics/comics.component'
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component'
import { SeriesComponent } from './series/series.component'
import { SeriesDetailsComponent } from './series/series-details/series-details.component'

@NgModule({
    declarations: [
        AppComponent,
        NavLinkComponent,
        SidebarComponent,
        HeaderComponent,
        CharactersComponent,
        CharacterDetailsComponent,
        ComicsComponent,
        ComicDetailsComponent,
        SeriesComponent,
        SeriesDetailsComponent,
    ],
    imports: [BrowserAnimationsModule, SharedModule, AppStoreModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

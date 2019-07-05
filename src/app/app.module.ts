import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'

import { NavLinkComponent } from './header/sidebar/nav-link/nav-link.component'
import { SidebarComponent } from './header/sidebar/sidebar.component'
import { HeaderComponent } from './header/header.component'
import { AppStoreModule } from './store/app-store.module'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { SearchBoxComponent } from './search/search-box/search-box.component'
import { SearchResultsComponent } from './search/search-results/search-results.component'
import { CharactersComponent } from './characters/characters.component'
import { ComicsComponent } from './comics/comics.component'
import { SeriesComponent } from './series/series.component'
import { ListComponent } from './list/list.component'
import { ListDetailsComponent } from './list/list-details/list-details.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component';
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component';
import { SeriesDetailsComponent } from './series/series-details/series-details.component'

@NgModule({
    declarations: [
        AppComponent,
        NavLinkComponent,
        SidebarComponent,
        HeaderComponent,
        SearchBoxComponent,
        SearchResultsComponent,
        CharactersComponent,
        ComicsComponent,
        SeriesComponent,
        ListComponent,
        ListDetailsComponent,
        CharacterDetailsComponent,
        ComicDetailsComponent,
        SeriesDetailsComponent,
    ],
    imports: [BrowserAnimationsModule, ReactiveFormsModule, SharedModule, AppStoreModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

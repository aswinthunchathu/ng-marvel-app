import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'

import { NavLinkComponent } from './header/sidebar/nav-link/nav-link.component'
import { SidebarComponent } from './header/sidebar/sidebar.component'
import { HeaderComponent } from './header/header.component'
import { AppStoreModule } from './store/app-store.module'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component'
import { SeriesDetailsComponent } from './series/series-details/series-details.component'
import { ListViewComponent } from './list-view/list-view.component'

@NgModule({
    declarations: [
        AppComponent,
        NavLinkComponent,
        SidebarComponent,
        HeaderComponent,
        CharacterDetailsComponent,
        ComicDetailsComponent,
        SeriesDetailsComponent,
        ListViewComponent,
    ],
    imports: [BrowserAnimationsModule, SharedModule, AppStoreModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

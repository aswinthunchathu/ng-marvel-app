import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'

import { NavLinkComponent } from './header/sidebar/nav-link/nav-link.component'
import { SidebarComponent } from './header/sidebar/sidebar.component'
import { HeaderComponent } from './header/header.component'
import { AppStoreModule } from './store/app-store.module'
import { SharedModule } from './shared/shared.module'
import { CharactersModule } from './characters/characters.module'
import { ComicsModule } from './comics/comics.module'
import { SeriesModule } from './series/series.module'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppStoreModule,
        NavLinkComponent,
        SidebarComponent,
        HeaderComponent,
        CharactersModule,
        ComicsModule,
        SeriesModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

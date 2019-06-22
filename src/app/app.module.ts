import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'

import { AppStoreModule } from './store/app-store.module'
import { SharedModule } from './shared/shared.module'
import { CharactersModule } from './characters/characters.module'
import { ComicsModule } from './comics/comics.module'
import { SeriesModule } from './series/series.module'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserAnimationsModule, SharedModule, AppStoreModule, CharactersModule, ComicsModule, SeriesModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

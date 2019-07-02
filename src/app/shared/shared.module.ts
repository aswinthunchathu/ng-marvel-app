/*
    Shared directives, components and services are registered here
*/

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { LoaderComponent } from './components/loader/loader.component'
import { ProgressiveImageLoadingDirective } from './directives/progressive-image-loading.directive'
import { CardComponent } from './components/card/card.component'
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component'
import { MaterialComponentsModule } from './material-components.module'
import { ApiInterceptor } from './services/api.service'
import { NoDataComponent } from './components/no-data/no-data.component'
import { PillComponent } from './components/pill/pill.component'

@NgModule({
    declarations: [
        LoaderComponent,
        ProgressiveImageLoadingDirective,
        CardComponent,
        ErrorHandlerComponent,
        NoDataComponent,
        PillComponent,
    ],
    imports: [CommonModule, HttpClientModule, InfiniteScrollModule, MaterialComponentsModule],
    exports: [
        HttpClientModule,
        InfiniteScrollModule,
        MaterialComponentsModule,
        LoaderComponent,
        ProgressiveImageLoadingDirective,
        CardComponent,
        ErrorHandlerComponent,
        NoDataComponent,
        PillComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
    ],
})
export class SharedModule {}

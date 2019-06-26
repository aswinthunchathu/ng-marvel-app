import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { LoaderComponent } from './components/loader/loader.component'
import { ProgressiveImageLoadingDirective } from './directives/progressive-image-loading.directive'
import { CardComponent } from './components/card/card.component'
import { ListComponent } from './components/list/list.component'
import { ListDetailsComponent } from './components/list/list-details/list-details.component'
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component'
import { MaterialComponentsModule } from './material-components.module'
import { ApiInterceptor } from './services/api.service'

@NgModule({
    declarations: [
        LoaderComponent,
        ProgressiveImageLoadingDirective,
        CardComponent,
        ListComponent,
        ListDetailsComponent,
        ErrorHandlerComponent,
    ],
    imports: [CommonModule, HttpClientModule, InfiniteScrollModule, MaterialComponentsModule],
    exports: [
        HttpClientModule,
        MaterialComponentsModule,
        LoaderComponent,
        ProgressiveImageLoadingDirective,
        CardComponent,
        ListComponent,
        ListDetailsComponent,
        ErrorHandlerComponent,
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

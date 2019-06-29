/*
    Angular Material design components are registered here
*/
import { NgModule } from '@angular/core'
import { MatTabsModule } from '@angular/material'

@NgModule({
    imports: [MatTabsModule],
    exports: [MatTabsModule],
})
export class MaterialComponentsModule {}

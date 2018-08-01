import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { LoaderComponent } from './component/loader.component'
import { AppComponent } from './component/app.component'
import { CharacterComponent } from './component/character/character.component'
import { ResultComponent } from './component/result/result.component'
import { KyaruchangComponent } from './component/kyaruchang/kyaruchang.component'

import { CharacterService } from './service/character.service'
import { CharacterSettingsService } from './service/character-settings.service'
import { EquipmentService } from './service/equipment.service'

const appRoutes: Routes = [
  { path: '', component: LoaderComponent },
];

@NgModule({
  declarations: [
    LoaderComponent,
    AppComponent,
    CharacterComponent,
    ResultComponent,
    KyaruchangComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule
  ],
  providers: [
    CharacterService,
    EquipmentService,
    CharacterSettingsService,
  ],
  bootstrap: [LoaderComponent]
})
export class AppModule { }

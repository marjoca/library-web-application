import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CitalacComponent } from './citalac/citalac.component';
import { RegisterComponent } from './register/register.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { PocetnastranaComponent } from './pocetnastrana/pocetnastrana.component';
import { ProfilComponent } from './profil/profil.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { DetaljioknjiziComponent } from './detaljioknjizi/detaljioknjizi.component';
import { PregledComponent } from './pregled/pregled.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { AzurirajknjiguComponent } from './azurirajknjigu/azurirajknjigu.component';
import { ZahtevComponent } from './zahtev/zahtev.component';
import { PregledzahtevaComponent } from './pregledzahteva/pregledzahteva.component';
import { PromenilozinkuComponent } from './promenilozinku/promenilozinku.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CitalacComponent,
    RegisterComponent,
    AdministratorComponent,
    PocetnastranaComponent,
    ProfilComponent,
    PretragaComponent,
    DetaljioknjiziComponent,
    PregledComponent,
    IstorijaComponent,
    ModeratorComponent,
    AzurirajknjiguComponent,
    ZahtevComponent,
    PregledzahtevaComponent,
    PromenilozinkuComponent,
    AdminloginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

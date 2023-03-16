import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AzurirajknjiguComponent } from './azurirajknjigu/azurirajknjigu.component';
import { CitalacComponent } from './citalac/citalac.component';
import { DetaljioknjiziComponent } from './detaljioknjizi/detaljioknjizi.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { LoginComponent } from './login/login.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { PocetnastranaComponent } from './pocetnastrana/pocetnastrana.component';
import { PregledComponent } from './pregled/pregled.component';
import { PregledzahtevaComponent } from './pregledzahteva/pregledzahteva.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ProfilComponent } from './profil/profil.component';
import { PromenilozinkuComponent } from './promenilozinku/promenilozinku.component';
import { RegisterComponent } from './register/register.component';
import { ZahtevComponent } from './zahtev/zahtev.component';

const routes: Routes = [
  {path:"",component:PocetnastranaComponent},

  {path:"login",component:LoginComponent},
  {path:"profil",component:ProfilComponent},
  {path:"citalac",component:CitalacComponent},
  {path:"registracija",component:RegisterComponent},
  {path:"administrator",component:AdministratorComponent},
  {path:"pretraga",component:PretragaComponent},
  {path:"detaljioknjizi",component:DetaljioknjiziComponent},
  {path:"pregled",component:PregledComponent},
  {path:"istorija",component:IstorijaComponent},
  {path:"moderator",component:ModeratorComponent},
  {path:"azurirajknjigu",component:AzurirajknjiguComponent},
  {path:"zahtev",component:ZahtevComponent},
  {path:"pregledzahteva",component:PregledzahtevaComponent},
  {path:"promenilozinku",component:PromenilozinkuComponent},
  {path:"adminlogin",component:AdminloginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

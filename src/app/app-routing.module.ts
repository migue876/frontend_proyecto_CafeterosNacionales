import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { CategoriaComponent } from './modulos/categoria/categoria.component';
import { ClientesComponent } from './modulos/clientes/clientes.component';
import { ContactosComponent } from './modulos/contactos/contactos.component';
import { PedidosComponent } from './modulos/pedidos/pedidos.component';
import { ProductosComponent } from './modulos/productos/productos.component';
import { ProveedorComponent } from './modulos/proveedor/proveedor.component';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { validaruserGuard } from './guard/validaruser.guard';
import { PedidoinsertarComponent } from './modulos/pedidoinsertar/pedidoinsertar.component';


const routes: Routes = [
  {
    path: '',component: PrincipalComponent,
    children:
    [
      {path: 'dashboard', component: DashboardComponent, canActivate:[validaruserGuard]},
      {path: 'categoria', component: CategoriaComponent,  canActivate:[validaruserGuard]},
      {path: 'clientes', component: ClientesComponent,  canActivate:[validaruserGuard]},
      {path: 'contactos', component: ContactosComponent,  canActivate:[validaruserGuard]},
      {path: 'pedidos', component: PedidosComponent,  canActivate:[validaruserGuard]},
      {path: 'pedidoins', component:PedidoinsertarComponent, canActivate:[validaruserGuard]},
      {path: 'productos', component: ProductosComponent,  canActivate:[validaruserGuard]},
      {path: 'proveedor', component: ProveedorComponent,  canActivate:[validaruserGuard]},
      {path: '',redirectTo: 'dashboard',pathMatch: 'full'}
    ]
  },

  {path:'login', component: LoginComponent},
  {path:'**', component: NoEncontroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

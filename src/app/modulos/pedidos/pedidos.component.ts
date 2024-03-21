import { validaruserGuard } from './../../guard/validaruser.guard';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../servicios/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {
  ventas:any;
  modal=false;
  productos:any;
  total:any;
  pedidos:any;
  obj_pedidos={
    no_venta:0,
    fecha:Date,
    cliente:"",
    descripcion:"",
    total:0,
    vendedor:""

}

  constructor(private router:Router, private spedido:PedidoService){}


  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.spedido.consultar().subscribe((resultado:any) => {
      this.ventas = resultado;
    })
  }

  consultap(id:number){
    this.spedido.consultarp(id).subscribe((resultado:any) => {
      this.productos = resultado;
      this.total=0;
      for(let i=0; i<this.productos.length; i++){
        this.total = this.total + this.productos[i][4];
      }
    })
  }

  insertar(){
    this.router.navigate(['pedidoins']);
  }

  mostrar_modal(dato: any, id:number){
    switch(dato){
      case 0:
        this.modal = false;
      break;
      case 1:
        this.modal = true;
        this.consultap(id);
      break;
    }
  }
  eliminar(id:number){
    Swal.fire({
      title: "¿Esta seguro de eliminar el pedido",
      text: "Este proceso no se podra revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        /////
        this.spedido.eliminar(id).subscribe((datos:any)=>{
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        /////
        Swal.fire({
          title: "Pedido eliminado!",
          text: "El pedido ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }


}



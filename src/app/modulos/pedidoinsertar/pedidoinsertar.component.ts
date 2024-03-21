import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';
import { ClienteService } from '../../servicios/cliente.service';
import { PedidoService } from '../../servicios/pedido.service';


@Component({
  selector: 'app-pedidoinsertar',
  templateUrl: './pedidoinsertar.component.html',
  styleUrls: ['./pedidoinsertar.component.scss']
})
export class PedidoinsertarComponent {

  productos: any;
  cliente: any;
  ident_cliente = "";
  nombre_cliente = "";
  id_cliente: any;
  matriz_producto: any = [];
  arreglo_productos: any = [];
  total: any = 0;
  pedido = {
    fecha: "",
    fo_cliente: 0,
    productos: [],
    subtotal: 0,
    total: 0,
    fo_vendedor: 0
  }

  constructor(private router: Router, private sproductos: ProductoService, private scliente: ClienteService,
  private spedido: PedidoService){}

  ngOnInit(): void {
    this.consulta_produtos();
  }

  consulta_produtos(){
    this.sproductos.consultar().subscribe((result:any)=>{
      this.productos = result;
    })
  }

  consulta_cliente(){
    this.scliente.ccliente(this.ident_cliente).subscribe((result:any)=>{
      this.cliente=result;
      this.nombre_cliente = this.cliente.nombre;
      console.log(this.cliente);
    })
  }

  seleccionar(valores:any, id:number){
    let cantidad = Number(prompt("Ingrese la cantidad a llevar"));
    this.arreglo_productos = [valores.codigo, valores.nombre, Number(valores.precio_venta), cantidad, cantidad * Number
    (valores.precio_venta)];
    this.matriz_producto.push(this.arreglo_productos);

    let largo = this.matriz_producto.length;
    this.total = 0;
    for(let i=0; i<largo; i++){
      this.total = this.total + this.matriz_producto[i][4];
    }

    //console.log(this.matriz_producto);

  }

  guardar(){
    let fecha = new Date();
    this.pedido.fecha = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    this.pedido.fo_cliente = Number(this.cliente[0].id_cliente);
    this.pedido.productos = this.matriz_producto;
    this.pedido.subtotal = this.total;
    this.pedido.total = this.total;
    this.pedido.fo_vendedor = Number(sessionStorage.getItem('id'));
    //console.log(this.pedido);

    this.spedido.insertar(this.pedido).subscribe((datos:any) => {
      this.router.navigate(['pedido']);
      if(datos['resultado']=='OK'){
        console.log(datos['resultado']);

      }
    });
  }

}

/* guardar(){
  // Verificar si cliente es null
  if (this.cliente) {
    // El cliente no es null, proceder con la asignación de propiedades
    let fecha = new Date();
    this.pedido.fecha = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    this.pedido.fo_cliente = Number(this.cliente[0].id_cliente);
    this.pedido.productos = this.matriz_producto;
    this.pedido.subtotal = this.total;
    this.pedido.total = this.total;
    this.pedido.fo_vendedor = Number(sessionStorage.getItem('id'));

    // Realizar la solicitud de inserción del pedido
    this.spedido.insertar(this.pedido).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        console.log(datos['resultado']);
        this.router.navigate(['pedido']);
      }
    });
  } else {
    // El cliente es null, mostrar un mensaje de error o realizar alguna acción adecuada
    console.error('El cliente es null. No se puede guardar el pedido.');
  }
}
}   */

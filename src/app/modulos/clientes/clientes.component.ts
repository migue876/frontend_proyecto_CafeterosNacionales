import { Component } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { CiudadService } from '../../servicios/ciudad.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  cliente:any;
  ciudad:any;
  id_cliente:any;
  obj_cliente={
    ident:"",
    nombre:"",
    direccion:"",
    celular:"",
    email:"",
    fo_ciudad:0
  }
  validar_ident=true;
  validar_nombre=true;
  validar_direccion=true;
  validar_celular=true;
  validar_email=true;
  validar_ciudad=true;
  mform=false;
  botones_form=false;
  constructor(private scliente:ClienteService,private sciu:CiudadService){}
  ngOnInit():void{
    this.consulta();
    this.consulta_ciudad();
  }
  consulta(){
    this.scliente.consultar().subscribe((resultado:any)=>{
      this.cliente=resultado;
      console.log(this.cliente);

    })
  }
  consulta_ciudad(){
    this.sciu.consultar(66).subscribe((resultado:any)=>{
      this.ciudad=resultado;
    })
  }
  mostrar_form(dato:any){
    switch(dato){
      case "ver":
        this.mform=true;
      break;
      case "no ver":
        this.mform=false;
        this.botones_form=false;
      break;
    }
  }
  limpiar(){
    this.obj_cliente={
      ident:"",
      nombre:"",
      direccion:"",
      celular:"",
      email:"",
      fo_ciudad:0
    }
  }
  validar(funcion:any){
    console.log(this.obj_cliente)
    if(this.obj_cliente.ident==""){
      this.validar_ident=false;
    }else{
      this.validar_ident=true;
    }
  if(this.obj_cliente.nombre==""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }
    if(this.obj_cliente.direccion==""){
      this.validar_direccion=false;
    }else{
      this.validar_direccion=true;
    }
    if(this.obj_cliente.celular==""){
      this.validar_celular=false;
    }else{
      this.validar_celular=true;
    }
    if(this.obj_cliente.email==""){
      this.validar_email=false;
    }else{
      this.validar_email=true;
    }
    if(this.obj_cliente.fo_ciudad==0){
      this.validar_ciudad=false;
    }else{
      this.validar_ciudad=true;
    }
    if(this.validar_ident==true&&this.validar_nombre==true&&this.validar_direccion==true&&this.validar_celular==true&&this.validar_email==true&&this.validar_ciudad==true&&funcion=="guardar"){
      this.guardar();
    }
    if(this.validar_ident==true&&this.validar_nombre==true&&this.validar_direccion==true&&this.validar_celular==true&&this.validar_email==true&&this.validar_ciudad==true&&funcion=="editar"){
      this.editar();
    }
  }
  guardar(){
    this.scliente.insertar(this.obj_cliente).subscribe((datos:any) =>{
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }
  eliminar(id:number){
    Swal.fire({
      title: "¿Esta seguro de eliminar el cliente?",
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
        this.scliente.eliminar(id).subscribe((datos:any)=>{
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        /////
        Swal.fire({
          title: "Cliente eliminado!",
          text: "El cliente ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }
  cargar_datos(items:any,id:number){
    this.obj_cliente={
      ident:items.ident,
      nombre:items.nombre,
      direccion:items.direccion,
      celular:items.celular,
      email:items.email,
      fo_ciudad:items.fo_ciudad
    }
    this.id_cliente=id;
    this.botones_form=true;
    this.mostrar_form('ver');
  }
  editar(){
    this.scliente.editar(this.id_cliente,this.obj_cliente).subscribe((datos:any) =>{
      if(datos['resultado']=="OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver')
  }
}

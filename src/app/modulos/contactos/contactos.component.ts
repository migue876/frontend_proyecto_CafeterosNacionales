import { Component } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.scss'
})
export class ContactosComponent {
  usuario:any;
  id_usuario:any;
  obj_usuario={
    ident:"",
    nombre:"",
    direccion:"",
    celular:"",
    email:"",
    rol:"",
    clave:""
  }
  validar_ident=true;
  validar_nombre=true;
  validar_direccion=true;
  validar_celular=true;
  validar_email=true;
  validar_rol=true;
  validar_clave=true;
  mform=false;
  botones_form=false;
  constructor(private susuario:UsuarioService){}
  ngOnInit():void{
    this.consulta();
  }
  consulta(){
    this.susuario.consultar().subscribe((resultado:any)=>{

      this.usuario=resultado;
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
  this.obj_usuario={
    ident:"",
    nombre:"",
    direccion:"",
    celular:"",
    email:"",
    rol:"",
    clave:""
  }
}
validar(funcion:any){
  console.log(this.obj_usuario)
  if(this.obj_usuario.ident==""){
    this.validar_ident=false;
  }else{
    this.validar_ident=true;
  }
if(this.obj_usuario.nombre==""){
    this.validar_nombre=false;
  }else{
    this.validar_nombre=true;
  }
  if(this.obj_usuario.direccion==""){
    this.validar_direccion=false;
  }else{
    this.validar_direccion=true;
  }
  if(this.obj_usuario.celular==""){
    this.validar_celular=false;
  }else{
    this.validar_celular=true;
  }
  if(this.obj_usuario.email==""){
    this.validar_email=false;
  }else{
    this.validar_email=true;
  }
  if(this.obj_usuario.rol==""){
    this.validar_rol=false;
  }else{
    this.validar_rol=true;
  }
  if(this.obj_usuario.clave==""){
    this.validar_clave=false;
  }else{
    this.validar_clave=true;
  }
  if(this.validar_ident==true&&this.validar_nombre==true&&this.validar_direccion==true&&this.validar_celular==true&&this.validar_email==true&&this.validar_rol==true&&this.validar_clave==true&&funcion=='guardar'){
    this.guardar();
  }
  if(this.validar_ident==true&&this.validar_nombre==true&&this.validar_direccion==true&&this.validar_celular==true&&this.validar_email==true&&this.validar_rol==true&&this.validar_clave==true&&funcion=='editar'){
    this.editar();
  }
}
guardar(){
  this.susuario.insertar(this.obj_usuario).subscribe((datos:any) =>{
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
        this.susuario.eliminar(id).subscribe((datos:any)=>{
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
    this.obj_usuario={
      ident:items.ident,
      nombre:items.nombre,
      direccion:items.direccion,
      celular:items.celular,
      email:items.email,
      rol:items.rol,
      clave:items.clave
    }
    this.id_usuario=id;
    this.botones_form=true;
    this.mostrar_form('ver');
  }
  editar(){
    this.susuario.editar(this.id_usuario,this.obj_usuario).subscribe((datos:any) =>{
      if(datos['resultado']=="OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver')
  }
}
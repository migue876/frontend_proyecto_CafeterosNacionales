import { Component } from '@angular/core';
import { ProveedorService } from '../../servicios/proveedor.service';
import { CiudadService } from '../../servicios/ciudad.service';
import Swal from 'sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.scss'
})
export class ProveedorComponent {
  proveedor:any;
  ciudad:any;
  id_prov:any;
  dpto = null;
  id_dpto = "";
  obj_proveedor={
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
  constructor(private sprov:ProveedorService,private sciu:CiudadService){}
  ngOnInit():void{
    this.consulta();
    //this.consulta_ciu();
    this.consulta_dpto();
    /*if(this.id_dpto!=""){
      this.consulta_ciu();
    }*/
  }
  consulta(){
    this.sprov.consultar().subscribe((resultado:any)=>{

      this.proveedor=resultado;
    })
  }
  consulta_ciu(){
    console.log("hola mnundo");
    console.log(this.id_dpto);


    this.sciu.consultar(this.id_dpto).subscribe((resultado:any)=>{
      this.ciudad=resultado;
      console.log(this.ciudad);
    })
  }

  consulta_dpto(){
    this.sciu.consultar_dpto().subscribe((resultado:any)=>{

      this.dpto=resultado;
      this.consulta_ciu();
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
    this.obj_proveedor={
      ident:"",
      nombre:"",
      direccion:"",
      celular:"",
      email:"",
      fo_ciudad:0
    }
  }
  validar(funcion:any){
    console.log(this.obj_proveedor)
    if(this.obj_proveedor.ident==""){
      this.validar_ident=false;
    }else{
      this.validar_ident=true;
    }
  if(this.obj_proveedor.nombre==""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }
    if(this.obj_proveedor.direccion==""){
      this.validar_direccion=false;
    }else{
      this.validar_direccion=true;
    }
    if(this.obj_proveedor.celular==""){
      this.validar_celular=false;
    }else{
      this.validar_celular=true;
    }
    if(this.obj_proveedor.email==""){
      this.validar_email=false;
    }else{
      this.validar_email=true;
    }
    if(this.obj_proveedor.fo_ciudad==0){
      this.validar_ciudad=false;
    }else{
      this.validar_ciudad=true;
    }
    if(this.validar_ident==true&&this.validar_nombre==true&&this.validar_direccion==true&&this.validar_celular==true&&this.validar_email==true&&this.validar_ciudad==true&&funcion=='guardar'){
      this.guardar();
    }
    if(this.validar_ident==true&&this.validar_nombre==true&&this.validar_direccion==true&&this.validar_celular==true&&this.validar_email==true&&this.validar_ciudad==true&&funcion=='editar'){
      this.editar();
    }
  }
  guardar(){
    this.sprov.insertar(this.obj_proveedor).subscribe((datos:any) =>{
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
        this.sprov.eliminar(id).subscribe((datos:any)=>{
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
    this.obj_proveedor={
      ident:items.ident,
      nombre:items.nombre,
      direccion:items.direccion,
      celular:items.celular,
      email:items.email,
      fo_ciudad:items.fo_ciudad
    }
    this.id_prov=id;
    this.botones_form=true;
    this.mostrar_form('ver');
  }
  editar(){
    this.sprov.editar(this.id_prov,this.obj_proveedor).subscribe((datos:any) =>{
      if(datos['resultado']=="OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver')
  }
}

import { Component } from '@angular/core';
import { CategoriaService } from '../../servicios/categoria.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  categoria:any;
  id_categoria:any;
  obj_categoria={
    nombre:""
  }
  validar_nombre=true;
  mform=false;
  botones_form=false;
  constructor(private scate:CategoriaService){}
  ngOnInit():void{
    this.consulta();
  }
  consulta(){
    this.scate.consultar().subscribe((resultado:any)=>{
      this.categoria=resultado;
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
    this.obj_categoria={
      nombre:"",
    }
  }
  validar(funcion:any){
    console.log(this.obj_categoria)
    if(this.obj_categoria.nombre==""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }
    if(this.validar_nombre==true&&funcion=='guardar'){
      this.guardar();
    }
    if(this.validar_nombre==true&&funcion=='editar'){
      this.editar();
    }
  }
  guardar(){
    this.scate.insertar(this.obj_categoria).subscribe((datos:any) =>{
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }
  eliminar(id:number){
    Swal.fire({
      title: "¿Esta seguro de eliminar el categoria?",
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
        this.scate.eliminar(id).subscribe((datos:any)=>{
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        /////
        Swal.fire({
          title: "Categoria eliminado!",
          text: "El categoria ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }
  cargar_datos(items:any,id:number){
    this.obj_categoria={
      nombre:items.nombre,
    }
    this.id_categoria=id;
    this.botones_form=true;
    this.mostrar_form('ver');
  }
  editar(){
    this.scate.editar(this.id_categoria,this.obj_categoria).subscribe((datos:any) =>{
      if(datos['resultado']=="OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver')
  }
}

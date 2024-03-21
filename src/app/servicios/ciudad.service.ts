import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  url='http://localhost/CafeterosNacionales/backend/controlador/controlador-ciudad.php';

  constructor(private http: HttpClient) { }

  consultar(id_dpto: any){
    console.log(id_dpto);

    return this.http.get(`${this.url}?control=ciudad&iddpto=${id_dpto}`);
  }
  consultar_dpto(){
    return this.http.get(`${this.url}?control=dpto`);
  }

}

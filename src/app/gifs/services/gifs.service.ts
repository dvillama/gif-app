import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string= 'aPhQbEZKb381egJq0ZwQAIb9RfZHBBd3';

  private _historial: string[] = [];

  // TODO: Cambiar esto por su tipado
  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query: string) {

    query = query.trim().toLowerCase();
  
    if( !this._historial.includes( query ) )  {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=aPhQbEZKb381egJq0ZwQAIb9RfZHBBd3&q=${ query }&limit=10`)
    .subscribe( (resp : any) => {
      console.log( resp.data );
      this.resultados = resp.data;
    })
    
    console.log(this._historial);
  }

  constructor( private http: HttpClient) { }
}

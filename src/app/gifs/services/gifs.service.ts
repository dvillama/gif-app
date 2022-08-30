import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string= 'aPhQbEZKb381egJq0ZwQAIb9RfZHBBd3';

  private _historial: string[] = [];

  // TODO: Cambiar esto por su tipado
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query: string) {

    query = query.trim().toLowerCase();
  
    if( !this._historial.includes( query ) )  {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=aPhQbEZKb381egJq0ZwQAIb9RfZHBBd3&q=${ query }&limit=10`)
    .subscribe( (resp ) => {
      console.log( resp.data );
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
    
    console.log(this._historial);
  }

  constructor( private http: HttpClient) { 

    if (localStorage.getItem('historial') ) {
      this._historial= JSON.parse(localStorage.getItem('historial')! );
    }

    if (localStorage.getItem('resultados') ) {
      this.resultados= JSON.parse(localStorage.getItem('resultados')! );
    }

  }
}

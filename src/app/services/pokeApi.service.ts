import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PokeApiService {

    constructor( private http: HttpClient ) { }

    getPokemons() {
        return this.http.get('https://pokeapi.co/api/v2/pokemon');
    }

    getPokemonNames(name: string) {
        return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    }
}
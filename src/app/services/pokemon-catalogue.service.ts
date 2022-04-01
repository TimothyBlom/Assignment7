import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { finalize, map } from 'rxjs';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonCatalogueService {
  private _pokemon: Pokemon[] = [];
  private _error: string = '';
  private _loading: boolean = false;

  get pokemon(): Pokemon[] {
    return this._pokemon;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}

  public getIdFromPokemonUrl(pokemonUrl: string): number {
    const splitUrl: string[] = pokemonUrl.split('/');
    const pokemonId: number = Number(splitUrl[6]);
    return pokemonId;
  }

  public findAllPokemon(): void {
    if (this._pokemon.length > 0 || this.loading) {
      return;
    }

    this._loading = true;
    this.http
      .get<any>(apiPokemon)
      .pipe(
        map((response: any) =>
          response.results.map((pokemon: { url: string; name: string }) => ({
            ...pokemon,
            id: this.getIdFromPokemonUrl(pokemon.url),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getIdFromPokemonUrl(
              pokemon.url
            )}.png`,
          }))
        ),
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemon: Pokemon[]) => {
          this._pokemon = pokemon;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }

  public pokemonById(id: number): Pokemon | undefined {
    return this._pokemon.find((pokemon: Pokemon) => pokemon.id === id);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const { apiKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root',
})
export class CaughtPokemonService {
  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly trainerService: TrainerService
  ) {}

  public addToCaughtPokemon(pokemonId: number): Observable<Trainer> {
    if (!this.trainerService.trainer) {
      throw new Error('addToCaughtPokemon: There is no trainer');
    }

    const trainer: Trainer = this.trainerService.trainer;
    const pokemon: Pokemon | undefined =
      this.pokemonCatalogueService.pokemonById(pokemonId);

    if (!pokemon) {
      throw new Error(`addToCaughtPokemon: No pokemon with id: ${pokemonId}`);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    });

    this._loading = true;

    return this.http
      .patch<Trainer>(
        `${apiTrainers}/${trainer.id}`,
        {
          pokemon: [...trainer.pokemon, pokemon.name],
        },
        {
          headers,
        }
      )
      .pipe(
        tap((updatedTrainer: Trainer) => {
          this.trainerService.trainer = updatedTrainer;
        }),
        finalize(() => {
          this._loading = false;
        })
      );
  }

  public removeFromCaughtPokemon(pokemonId: number): Observable<Trainer> {
    if (!this.trainerService.trainer) {
      throw new Error('removeFromCaughtPokemon: There is no trainer');
    }

    const trainer: Trainer = this.trainerService.trainer;
    const pokemon: Pokemon | undefined =
      this.pokemonCatalogueService.pokemonById(pokemonId);

    if (!pokemon) {
      throw new Error(
        `removeFromCaughtPokemon: No pokemon with id: ${pokemonId}`
      );
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    });

    this._loading = true;

    return this.http
      .patch<Trainer>(
        `${apiTrainers}/${trainer.id}`,
        {
          pokemon: trainer.pokemon.filter(
            (singlePokemonName) => singlePokemonName !== pokemon.name
          ),
        },
        {
          headers,
        }
      )
      .pipe(
        tap((updatedTrainer: Trainer) => {
          this.trainerService.trainer = updatedTrainer;
        }),
        finalize(() => {
          this._loading = false;
        })
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage implements OnInit {
  get caughtPokemonNames(): string[] {
    if (this.trainerService.trainer) {
      return this.trainerService.trainer.pokemon;
    }

    return [];
  }

  get pokemon(): Pokemon[] {
    return this.pokemonCatalogueService.pokemon;
  }

  getCaughtPokemon(pokemon: Pokemon[]): Pokemon[] {
    const caughtPokemon: Pokemon[] = [];
    this.caughtPokemonNames.forEach((pokemonName) => {
      const foundPokemon = pokemon.find((p) => p.name === pokemonName);
      if (foundPokemon) {
        caughtPokemon.push(foundPokemon);
      }
    });
    return caughtPokemon;
  }

  constructor(
    private trainerService: TrainerService,
    private pokemonCatalogueService: PokemonCatalogueService
  ) {}

  ngOnInit(): void {}
}

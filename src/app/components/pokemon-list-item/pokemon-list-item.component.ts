import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { CaughtPokemonService } from 'src/app/services/caught-pokemon.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent implements OnInit {
  public hasBeenCaught: boolean = false;

  @Input() singlePokemon?: Pokemon;

  constructor(
    private trainerService: TrainerService,
    private readonly caughtPokemonService: CaughtPokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.singlePokemon) {
      this.hasBeenCaught = this.trainerService.inCaughtPokemon(
        this.singlePokemon.name
      );
    }
  }

  isCatalogueRoute() {
    return this.router.url === '/catalogue';
  }

  onCatchClick(): void {
    this.caughtPokemonService
      .addToCaughtPokemon(this.singlePokemon!.id)
      .subscribe({
        next: (trainer: Trainer) => {
          this.hasBeenCaught = this.trainerService.inCaughtPokemon(
            this.singlePokemon!.name
          );
        },
        error: (error: HttpErrorResponse) => {
          console.log('ERROR', error.message);
        },
      });
  }

  onReleaseClick(): void {
    this.caughtPokemonService
      .removeFromCaughtPokemon(this.singlePokemon!.id)
      .subscribe({
        next: (trainer: Trainer) => {
          this.hasBeenCaught = false;
        },
        error: (error: HttpErrorResponse) => {
          console.log('ERROR', error.message);
        },
      });
  }
}

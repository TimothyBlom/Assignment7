import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/pokeApi.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage implements OnInit {
  pokemons: any[] = [];

  constructor( private pokeApiService: PokeApiService ){ }

  ngOnInit(): void {
    this.pokeApiService.getPokemons()
      .subscribe((response: any) => { 
        response.results.forEach((result: { name: string; }) => {
          this.pokeApiService.getPokemonNames(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });
  }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
})
export class PageHeaderComponent implements OnInit {
  constructor(
    private readonly loginService: LoginService,
    private readonly trainerService: TrainerService,
    private readonly router: Router
  ) {}

  get isTrainerLoggedIn(): boolean {
    return this.loginService.isTrainerLoggedIn();
  }

  get currentTrainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  handleLogout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}
}

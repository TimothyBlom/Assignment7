import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';
import { TrainerService } from './trainer.service';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly http: HttpClient,
    private trainerService: TrainerService
  ) {}

  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username).pipe(
      switchMap((trainer: Trainer | undefined) => {
        if (trainer === undefined) {
          return this.createTrainer(username);
        }
        return of(trainer);
      })
    );
  }

  public logout(): void {
    StorageUtil.storageClear();
    this.trainerService.trainer = undefined;
  }

  public isTrainerLoggedIn(): boolean {
    if (StorageUtil.storageRead<Trainer>(StorageKeys.Trainer)) {
      return true;
    }
    return false;
  }

  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http
      .get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(map((response: Trainer[]) => response.pop()));
  }

  private createTrainer(username: string): Observable<Trainer> {
    const trainer = {
      username,
      pokemon: [],
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    });

    return this.http.post<Trainer>(apiTrainers, trainer, {
      headers,
    });
  }
}

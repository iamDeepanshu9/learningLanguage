import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PersonsService} from './persons.service';

@Injectable({
  providedIn: 'root'
})
export class Auth5Guard implements CanActivate {

  constructor(private personsService: PersonsService) {
  }

  canActivate() {
    return this.personsService.isLogged(5);
  }

}

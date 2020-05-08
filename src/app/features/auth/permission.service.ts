import { Injectable } from '@angular/core';
import { AuthService } from '@hrh/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private authService: AuthService) {}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface UserData {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppContextService {
  private userInfoSubject = new BehaviorSubject<UserData | null>(null);
  private userInfo$ = this.userInfoSubject.asObservable();
  private apiUrl = 'https://api.example.com/user'; // Replace with actual API

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserData> {
    return this.userInfo$.pipe(
      switchMap((user) => {
        if (user) {
          return of(user); // If user data exists, return it
        } else {
          return this.http.get<UserData>(this.apiUrl).pipe(
            tap((data) => this.userInfoSubject.next(data)), // Store API response
            catchError((error) => {
              console.error('Error fetching user data:', error);
              return throwError(() => new Error('Failed to fetch user data'));
            })
          );
        }
      })
    );
  }
}







// In component


import { Component, OnInit } from '@angular/core';
import { AppContextService } from './app-context.service';

@Component({
  selector: 'app-user',
  template: `
    <p *ngIf="error" class="error">{{ error }}</p>
    <p *ngIf="user">User: {{ user | json }}</p>
  `,
})
export class UserComponent implements OnInit {
  user: any;
  error: string | null = null;

  constructor(private appContext: AppContextService) {}

  ngOnInit() {
    this.appContext.getUser().subscribe({
      next: (data) => {
        this.user = data;
        this.error = null; // Clear error if successful
      },
      error: (err) => {
        this.error = err.message; // Show error message in UI
      },
    });
  }
}



// for token

try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error('Invalid JWT token:', error);
    return null;
  }

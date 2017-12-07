import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FederalTaxes } from '../models/federal-taxes';

@Injectable()
export class FederalTaxService {
  
  constructor(
    private http: HttpClient
  ) {}
  
  getFederalTaxes(year: number) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVhMjczNjJhMTk3Y2U4MmIwN2RmZDJiYyIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTUxMjUxOTIxMH0.zgesOx_4GIaMA1pmfhQKs3uubcVVBKdMKQTjjZ4XtV8');
    
    return this.http.get(`https://taxee.io/api/v2/federal/${year}`, { headers })
      .map(json => new FederalTaxes(json))
      .publishLast()
      .refCount();
  }
}
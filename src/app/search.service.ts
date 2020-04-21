import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface CdnSearchResponse {
  results: { name: string }[],
  total: number,
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  readonly SEARCH_URL = "https://api.cdnjs.com/libraries";

  constructor(private http: HttpClient) { }

  get(name: string, fields?: string[]) {
    if(!fields) {
      fields = []
    }
    fields.push('name');
    fields.push('version');
    fields.push('homepage');
    fields = [...new Set(fields)];
    
    const params_ = {
      search: name,
      fields: fields.join(',')
    }

    const params = new HttpParams().set('search', name).set('fields', fields.join(','));

    return this.http.get<CdnSearchResponse>(this.SEARCH_URL, { params: params });
  }

}
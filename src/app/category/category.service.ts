import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = "https://localhost:5001/api/categories";

  constructor(private http: HttpClient) {

  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      catchError(this.errorHandler));
   
  }
  getSpecificCategory(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.url+'/'+id).pipe(
      catchError(this.errorHandler));
   
  }
  
  getSubCategories(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.url+'/'+id+'/sub').pipe(
      catchError(this.errorHandler));
  }

  addSubCategory(parent_id: number, item: any): Observable<any[]> {
    console.log(`hi {0}`, item)
    console.log(`parent {0}`, parent_id)
    return this.http.put<any[]>(this.url+'/'+parent_id+'/sub', item).pipe(
      catchError(this.errorHandler));
  }

  addCategory(item: any): Observable<any[]> {
    return this.http.post<any[]>(this.url, item).pipe(
      catchError(this.errorHandler));
  }

  updateCategory(item: any): Observable<any[]> {
    return this.http.put<any[]>(this.url+'/'+item.id, item).pipe(
      catchError(this.errorHandler));
   
  }

  deleteCategory(id: number): Observable<any[]> {
    console.log(id)

    return this.http.delete<any[]>(this.url+'/'+id).pipe(
      catchError(this.errorHandler));
   
  }

  deleteSubCategory(item: any): Observable<any[]> {
    console.log(`child {0}`, item)
    console.log(`child {0}`, item.childCategoryID)
    console.log(`parent {0}`, item.parentCategoryID)
    return this.http.put<any[]>(this.url+'/'+item.parentCategoryID+'/sub/'+item.childCategoryID, {}).pipe(
      catchError(this.errorHandler));
   
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
}

export interface CategoryData {
  name: string;
  id: number;
  description: string;
  isActive: boolean;
}

export interface SubCategoryData {
  id: number;
  name: string;
  ParentCategoryID: string;
  ChildCategoryID: string;
}


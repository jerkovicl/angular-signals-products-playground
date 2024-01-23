import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly baseUrl: string = 'https://dummyjson.com/products';
  private readonly httpClient: HttpClient = inject(HttpClient);

  getAll(): Observable<Product[]> {
    return this.httpClient
      .get(this.baseUrl)
      .pipe(map((res: any) => res.products)) as Observable<Product[]>;
  }

  get(id: number): Observable<Product> {
    return this.httpClient.get(`${this.baseUrl}/${id}`) as Observable<Product>;
  }

  add(product: Product): Observable<Product> {
    return this.httpClient.post(
      `${this.baseUrl}/add`,
      product
    ) as Observable<Product>;
  }

  update(product: Product): Observable<Product> {
    const { id: _, ...productWithoutId } = product;
    return this.httpClient.put(
      `${this.baseUrl}/${product.id}`,
      productWithoutId
    ) as Observable<Product>;
  }

  getCategories(): Observable<string[]> {
    return this.httpClient.get(`${this.baseUrl}/categories`) as Observable<
      string[]
    >;
  }
}

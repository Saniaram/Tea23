import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductType[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    //ajax
    console.log('a');
    console.log(this.http.get<ProductType[]>('https://testologia.site/tea'));
    return this.http.get<ProductType[]>('https://testologia.site/tea');
  }
  getProduct(id: number): Observable<ProductType> {
    //ajax
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`)
  }

  createOrder(data: {name?: string | null,
    last_name?: string | null,
    phone?: string | null,
    country?: string | null,
    zip?: string | null,
    product?:string | null,
    address?: string | null,
    comment?: string | null,}) {
    console.log(data);
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.site/order-tea`, data)
  }
}

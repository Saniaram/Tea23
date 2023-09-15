import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public products: ProductType[] = [];
  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        {
          next: (data) => {
            console.log(data);
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      );
  }
}

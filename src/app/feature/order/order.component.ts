import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../shared/services/product.service";
declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[а-яА-я]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[а-яА-я]+$')]],
    phone: ['', [Validators.required,Validators.pattern('^[+]?[0-9]{11}$')]],
    zip: ['', [Validators.required]],
    country: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.pattern('^[a-zа-яA-ZА-Я0-9/ ]*')]],
    product: [{value: '', disabled: true}],
    comment: [''],
  })
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  public showThank: boolean = false;
  public showError: boolean = false;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        console.log(params['product']);
        this.checkoutForm.patchValue({
          product: params['product']});
      }
    })
  }


  public createOrder():void {
    if (!this.checkoutForm.valid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.subscriptionOrder = this.productService.createOrder(this.checkoutForm.getRawValue()).subscribe(response => {
      console.log(response);
      if(response.success && !response.message) {
        this.showThank = true;
      } else {
        this.showError = true;
      }
    })


  }
}

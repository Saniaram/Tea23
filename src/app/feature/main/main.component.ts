import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy{
  private observable: Observable<void>;
  constructor() {
    this.observable = new Observable((observer) => {
      const timeout1 = setTimeout(() => {
        observer.next();
      }, 10000);
      return {
        unsubscribe() {
          clearTimeout(timeout1);
        }
      }
    });
  }

  private subscription: Subscription | null = null;

  ngOnInit(){

    this.subscription = this.observable.subscribe( {
      next: () => {
        $('#popUp').removeClass('d-none').addClass('d-flex');
      },
      error: (error) => {
        console.log(error);
      }
    })

    $('#popUp').click(function(){
      console.log('a');
      $('#popUp').removeClass('d-flex').addClass('d-none');
    });




    $(function () {
      var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
      };
      let accordionC = $("#accordion");
      accordionC.accordion({
        heightStyle: "content",
        icons: icons
      });
      accordionC.accordion("option", "icons", null);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

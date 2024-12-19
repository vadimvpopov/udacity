import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ConfirmationDetails } from '../models/confirmation_details';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  confirmationDetails!: ConfirmationDetails;
  hasError: boolean = false;
  errorMessage:string = "";
  constructor(private cartService: CartService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { 
      if (params['error']) { 
        this.errorMessage = `Error confirming: ${params["error"]}`;
        console.log(this.errorMessage);
        this.hasError = true; 
      }
    });
    this.confirmationDetails = this.cartService.confirmationDetails;
  }
}

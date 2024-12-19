import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ProductItemDetailComponent  } from './product-item-detail/product-item-detail.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { authenticated } from './auth.protection';

export const routes: Routes = [
    { path: 'product-list', component: ProductListComponent},
    { path: 'cart', component: CartComponent, canActivate: [authenticated], title: 'Cart'},
    { path: 'item-details/:id', component: ProductItemDetailComponent,  title: 'Item details',},
    { path: 'confirmation', component: ConfirmationComponent, title: 'Confirmation',},
    { path: 'sign/in', component: SignInComponent, title: 'Sign In',},
    { path: 'sign/up', component: SignInComponent, title: 'Sign Up',},
];

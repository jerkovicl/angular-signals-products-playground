import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    RouterLink,
    MatDividerModule,
    MatButtonModule,
    ProductItemComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  private readonly productsService: ProductsService = inject(ProductsService);
  public products: Signal<Product[] | undefined> = toSignal(
    this.productsService.getAll()
  );
}

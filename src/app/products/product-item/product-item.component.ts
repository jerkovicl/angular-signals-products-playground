import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Product } from '../product.model';

@Component({
    selector: 'app-product-item',
    imports: [
        RouterLink,
        NgOptimizedImage,
        MatCardModule,
        MatDividerModule,
        MatRippleModule,
        MatIconModule,
        MatChipsModule,
    ],
    templateUrl: './product-item.component.html',
    styleUrl: './product-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {
  product: InputSignal<Product> = input.required<Product>();
}

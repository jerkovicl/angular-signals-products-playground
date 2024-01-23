import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  numberAttribute,
  OnInit,
  Signal,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { NotificationService } from '../../shared/notifications.service';
import { Product, ProductForm } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {
  public productForm!: FormGroup<ProductForm>;
  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);
  private readonly notificationService: NotificationService =
    inject(NotificationService);
  id: InputSignal<number, string> = input.required<number, string>({
    transform: numberAttribute,
  });

  product: Signal<Product | undefined> = toSignal(
    toObservable(this.id).pipe(
      switchMap((id: number): Observable<Product | undefined> => {
        return Number.isNaN(id)
          ? of(undefined)
          : this.productsService.get(id).pipe(
              tap((res: Product) => {
                if (res) {
                  this.productForm.setValue(res);
                  // console.log('product', res, this.productForm);
                }
              })
            );
      })
    )
  );
  categories: Signal<string[] | undefined> = toSignal(
    this.productsService.getCategories()
  );

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [0, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [
        0,
        Validators.compose([Validators.required, Validators.pattern('[0-9]*')]),
      ],
      discountPercentage: [0],
      rating: [
        0,
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.min(1),
          Validators.max(10),
        ]),
      ],
      stock: [0],
      brand: [''],
      category: ['', Validators.required],
      thumbnail: [''],
      images: [['']],
    });
  }

  onSubmit(): void {
    // console.log('productForm', this.productForm.value);
    const product: Product = { ...(this.productForm.value as Product) };
    if (product.id === 0) {
      this.productsService
        .add(product)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (product: Product) =>
            this.notificationService.showInfo(
              `Product added successfully`,
              4000
            ),
          error: () =>
            this.notificationService.showClientError(
              'There was an error adding the product'
            ),
          complete: () => {
            this.router.navigateByUrl('/products');
          },
        });
    } else if (product.id > 0) {
      this.productsService
        .update(product)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (product: Product) =>
            this.notificationService.showInfo(
              `Product updated successfully`,
              4000
            ),
          error: () =>
            this.notificationService.showClientError(
              'There was an error updating the product'
            ),
          complete: () => {
            this.router.navigateByUrl('/products');
          },
        });
    }
  }
}

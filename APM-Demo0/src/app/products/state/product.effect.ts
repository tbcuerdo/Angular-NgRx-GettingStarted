import { Injectable } from "@angular/core";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as ProductActions from "./product.actions";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from "rxjs";

@Injectable()
export class ProductEffects {
    constructor(private action$: Actions, private productService: ProductService) { }

    loadProduct$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() => this.productService.getProducts()
                .pipe(
                    map(products => ProductActions.loadProductsSuccess({ products })),
                    catchError(error => of(ProductActions.loadProductsFailure({ error })))
                ))
        )
    })
}
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, finalize, of, timeout } from 'rxjs';

import { RoutesService } from '../../services/routes.service';
import { Difficulty, TourRoute } from '../../models/tour-route.model';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './routes.component.html',
})
export class RoutesComponent implements OnInit {
  loading = false;
  error: string | null = null;

  routes: TourRoute[] = [];
  editingId: string | null = null;

  difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  form: FormGroup;

  constructor(
    private routesService: RoutesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      startLocation: ['', [Validators.required]],
      endLocation: ['', [Validators.required]],
      distanceKm: [0, [Validators.required, Validators.min(0.1)]],
      durationMinutes: [0, [Validators.required, Validators.min(1)]],
      difficulty: ['Easy' as Difficulty, [Validators.required]],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.startCreate(); // alap értékek
    this.load();        // lista betöltés
  }

  load(): void {
    this.loading = true;
    this.error = null;

    this.routesService
      .getAll()
      .pipe(
        timeout(10_000),
        catchError((err) => {
          // ne ragadjon "Betöltés..." állapotban
          this.error =
            err?.error?.title ||
            err?.message ||
            'Nem sikerült lekérni az útvonalakat.';
          return of([] as TourRoute[]);
        }),
        finalize(() => {
          this.loading = false;
          // ha zoneless / CD gond van, ezzel biztosan frissül a UI
          this.cdr.detectChanges();
        })
      )
      .subscribe((data) => {
        this.routes = data ?? [];
        this.cdr.detectChanges();
      });
  }

  startCreate(): void {
    this.editingId = null;
    this.form.reset({
      name: '',
      startLocation: '',
      endLocation: '',
      distanceKm: 0,
      durationMinutes: 0,
      difficulty: 'Easy',
      notes: '',
    });
    this.cdr.detectChanges();
  }

  startEdit(route: TourRoute): void {
    this.editingId = route.id ?? null;
    this.form.reset({
      name: route.name,
      startLocation: route.startLocation,
      endLocation: route.endLocation,
      distanceKm: route.distanceKm,
      durationMinutes: route.durationMinutes,
      difficulty: route.difficulty,
      notes: route.notes ?? '',
    });
    this.cdr.detectChanges();
  }

  cancelEdit(): void {
    this.startCreate();
  }

  save(): void {
    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    const payload = this.form.getRawValue() as any;

    if (this.editingId) {
      this.routesService.update(this.editingId, payload).subscribe({
        next: () => {
          this.cancelEdit();
          this.load();
        },
        error: (err) => {
          this.error =
            err?.error?.title ||
            err?.message ||
            'Szerkesztés sikertelen.';
          this.cdr.detectChanges();
        },
      });
    } else {
      this.routesService.create(payload).subscribe({
        next: () => {
          this.startCreate();
          this.load();
        },
        error: (err) => {
          this.error =
            err?.error?.title ||
            err?.message ||
            'Létrehozás sikertelen.';
          this.cdr.detectChanges();
        },
      });
    }
  }

  delete(id?: string): void {
    if (!id) return;

    this.routesService.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        this.error =
          err?.error?.title ||
          err?.message ||
          'Törlés sikertelen.';
        this.cdr.detectChanges();
      },
    });
  }

  hasError(field: string, error: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.touched && c.hasError(error));
  }
}
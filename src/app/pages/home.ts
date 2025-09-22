import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section class="container max-w-7xl mx-auto py-16 md:py-24">
      <div class="flex items-center justify-center">
        <div class="relative w-full max-w-3xl">
          <div class="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-brand-400/60 via-brand-500/60 to-brand-700/60 blur opacity-70"></div>
          <div class="relative rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5 p-8 sm:p-12">
            <div
              class="group cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-8 sm:p-10 text-center transition hover:bg-slate-50"
              [class.border-brand-500]="dragActive"
              [class.bg-brand-50]="dragActive"
              (click)="openFilePicker(fileInput)"
              (dragover)="onDragOver($event)"
              (dragleave)="onDragLeave($event)"
              (drop)="onDrop($event)"
            >
              <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 text-brand-600 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
                  <path d="M6.75 14.25a.75.75 0 01.75-.75h3v-3a.75.75 0 011.5 0v3h3a.75.75 0 010 1.5h-3v3a.75.75 0 01-1.5 0v-3h-3a.75.75 0 01-.75-.75z"/>
                  <path fill-rule="evenodd" d="M9.75 7.5a4.5 4.5 0 118.794 1.5H19.5a3 3 0 010 6H16.5v-.75a.75.75 0 00-1.5 0v.75H9a3.75 3.75 0 010-7.5c.257 0 .51.024.757.072A4.49 4.49 0 019.75 7.5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <p class="mt-4 text-base sm:text-lg font-medium text-slate-700">
                Drag &amp; Drop Your Document Here, or Click to Browse
              </p>
              <input #fileInput type="file" class="hidden" (change)="onFileSelected($event)" />
            </div>

            <div class="mt-6 flex justify-center">
              <button
                type="button"
                class="inline-flex items-center rounded-lg bg-brand-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                [disabled]="!hasFile"
                (click)="goAnalyze()"
              >
                Analyze Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomePageComponent {
  dragActive = false;
  hasFile = false;

  constructor(private router: Router) {}

  openFilePicker(input: HTMLInputElement) {
    input.click();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragActive = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragActive = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragActive = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.hasFile = true;
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    this.hasFile = !!files && files.length > 0;
  }

  goAnalyze() {
    if (this.hasFile) {
      this.router.navigateByUrl('/analyze');
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="w-full border-t border-slate-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div class="container max-w-7xl mx-auto h-16 flex items-center justify-center">
        <p class="text-sm text-slate-600">© {{ year }} LegalEase. All rights reserved.</p>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}

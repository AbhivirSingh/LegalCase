import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="w-full border-b border-slate-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div class="container max-w-7xl mx-auto flex items-center justify-between h-16">
        <div class="flex items-center gap-2 select-none">
          <div class="h-8 w-8 rounded-md bg-gradient-to-br from-brand-400 to-brand-600 shadow-brand"></div>
          <span class="text-xl font-semibold tracking-tight text-slate-900">LegalEase</span>
        </div>
        <div class="flex items-center gap-3">
          <button type="button" class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M12 2.25a5.25 5.25 0 00-5.25 5.25v1.5a3 3 0 00-3 3v4.5a3 3 0 003 3h10.5a3 3 0 003-3v-4.5a3 3 0 00-3-3v-1.5A5.25 5.25 0 0012 2.25zm3.75 6.75v-1.5a3.75 3.75 0 10-7.5 0v1.5h7.5z" clip-rule="evenodd" /></svg>
            <span class="font-medium">Login</span>
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {}

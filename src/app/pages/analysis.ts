import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BACKEND_API_URL } from '../app.config';
import { analyzeText, askQuestion } from '../api.service';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="container max-w-7xl mx-auto py-10 md:py-14">
      <div class="grid gap-6 md:gap-8 md:grid-cols-12">
        <div class="md:col-span-5">
          <div class="rounded-2xl bg-white ring-1 ring-slate-900/5 shadow-2xl p-4">
            <h2 class="text-sm font-semibold text-slate-700 mb-3">Document Viewer</h2>
            <div class="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 h-[70vh] flex items-center justify-center text-slate-500">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mx-auto mb-2 h-8 w-8 text-slate-400"><path d="M3.75 4.875C3.75 3.84 4.59 3 5.625 3h7.5c.3 0 .588.12.8.333l4.5 4.5c.212.212.325.5.325.8v10.492A1.875 1.875 0 0116.875 21H5.625A1.875 1.875 0 013.75 19.125V4.875zM13.5 3v5.25h5.25"/></svg>
                <p class="text-sm">Preview of the uploaded document will appear here.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="md:col-span-7">
          <div class="rounded-2xl bg-white ring-1 ring-slate-900/5 shadow-2xl p-0">
            <div class="flex items-center justify-between px-6 pt-5">
              <h2 class="text-lg font-semibold text-slate-900">AI Analysis</h2>
            </div>
            <div class="mt-3 px-3 border-b border-slate-200">
              <div role="tablist" class="flex gap-1">
                <button (click)="setTab('summary')" [class.bg-white]="activeTab==='summary'" [class.text-brand-700]="activeTab==='summary'" class="px-4 py-2 rounded-t-md text-sm font-medium text-slate-600 hover:text-slate-900">
                  Summary
                </button>
                <button (click)="setTab('clauses')" [class.bg-white]="activeTab==='clauses'" [class.text-brand-700]="activeTab==='clauses'" class="px-4 py-2 rounded-t-md text-sm font-medium text-slate-600 hover:text-slate-900">
                  Key Clauses
                </button>
                <button (click)="setTab('qa')" [class.bg-white]="activeTab==='qa'" [class.text-brand-700]="activeTab==='qa'" class="px-4 py-2 rounded-t-md text-sm font-medium text-slate-600 hover:text-slate-900">
                  Q&amp;A
                </button>
              </div>
            </div>
            <div class="p-6">
              <div *ngIf="activeTab==='summary'" class="prose prose-slate max-w-none">
                <p>
                  This area will summarize your document with key points, obligations, dates, and risks once analysis is complete. Use this as a quick briefing before deep-diving into clauses.
                </p>
                <ul>
                  <li>High-level overview of parties and intent</li>
                  <li>Important dates and renewal terms</li>
                  <li>Notable risks and responsibilities</li>
                </ul>
              </div>

              <div *ngIf="activeTab==='clauses'">
                <div class="space-y-3">
                  <div *ngFor="let c of clauses; let i = index" class="rounded-lg border border-slate-200">
                    <button type="button" (click)="toggle(i)" class="w-full flex items-center justify-between px-4 py-3 text-left">
                      <span class="font-medium text-slate-900">{{ c.title }}</span>
                      <svg class="h-4 w-4 text-slate-500 transition-transform" [class.rotate-180]="expanded.has(i)" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <div *ngIf="expanded.has(i)" class="px-4 pb-4 text-slate-700">
                      {{ c.content }}
                    </div>
                  </div>
                </div>
              </div>

              <div *ngIf="activeTab==='qa'" class="flex flex-col h-[70vh]">
                <div #chat class="flex-1 overflow-y-auto space-y-3 pr-1">
                  <div *ngFor="let m of messages; let idx = index" class="flex" [class.justify-end]="m.role==='user'" [class.justify-start]="m.role==='ai'">
                    <div [ngClass]="m.role==='user' ? 'bg-brand-600 text-white rounded-l-2xl rounded-tr-2xl' : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-r-2xl rounded-tl-2xl'" class="max-w-[85%] px-4 py-2 shadow-sm">
                      {{ m.text }}
                    </div>
                  </div>
                </div>
                <form (submit)="send()" class="mt-4 flex items-center gap-2">
                  <input type="text" [(ngModel)]="messageText" name="message" placeholder="Ask a question about this document..." class="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" (keyup.enter)="send()" />
                  <button type="button" (click)="send()" [disabled]="!messageText.trim()" class="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AnalysisPageComponent {
  activeTab: 'summary' | 'clauses' | 'qa' = 'summary';

  summary: string = '';
  keyClauses: string[] = [];
  loadingAnalysis = false;

  clauses = [
    { title: 'Termination', content: 'Either party may terminate the agreement with 30 days written notice, subject to payment of outstanding obligations.' },
    { title: 'Confidentiality', content: 'All non-public information exchanged under this agreement must be kept confidential for 2 years after termination.' },
    { title: 'Limitation of Liability', content: 'Liability is limited to direct damages and capped at the fees paid in the previous 12 months, excluding gross negligence or willful misconduct.' }
  ];

  expanded = new Set<number>();

  messages: { role: 'user' | 'ai'; text: string }[] = [
    { role: 'ai', text: 'Hi! Ask anything about the document and I\'ll help.' }
  ];
  messageText = '';
  @ViewChild('chat') chatRef?: ElementRef<HTMLDivElement>;

  setTab(tab: 'summary' | 'clauses' | 'qa') {
    this.activeTab = tab;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  toggle(i: number) {
    if (this.expanded.has(i)) this.expanded.delete(i);
    else this.expanded.add(i);
  }

  async analyzeDocument(text: string) {
    this.loadingAnalysis = true;
    try {
      const data = await analyzeText(text);
      this.summary = (data as any).summary || '';
      this.keyClauses = ((data as any).key_clauses || '').split(/\n|\r/).filter((c: string) => c.trim());
    } catch (e) {
      this.summary = 'Error analyzing document.';
      this.keyClauses = [];
    } finally {
      this.loadingAnalysis = false;
    }
  }

  async send() {
    const text = this.messageText.trim();
    if (!text) return;
    this.messages.push({ role: 'user', text });
    this.messageText = '';
    this.scrollToBottom();

    // Call backend /api/ask
    try {
      // For demo, use the summary as the document text (replace with real doc text as needed)
      const docText = this.summary || 'No document text available.';
      const data = await askQuestion(text, docText);
      this.messages.push({ role: 'ai', text: (data as any).answer || 'No answer.' });
    } catch (e) {
      this.messages.push({ role: 'ai', text: 'Error getting answer from backend.' });
    }
    this.scrollToBottom();
  }

  private scrollToBottom() {
    const el = this.chatRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}

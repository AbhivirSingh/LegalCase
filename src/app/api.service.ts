import { BACKEND_API_URL } from './app.config';

// Upload a file to /api/upload
export async function uploadFile(file: File): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${BACKEND_API_URL}/api/upload`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}

// Analyze text via /api/analyze
export async function analyzeText(text: string): Promise<{ summary: string; key_clauses: string } | { error: string }> {
  const response = await fetch(`${BACKEND_API_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

// Ask a question via /api/ask
export async function askQuestion(question: string, documentText: string): Promise<{ answer: string } | { error: string }> {
  const response = await fetch(`${BACKEND_API_URL}/api/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, document_text: documentText })
  });
  return response.json();
}

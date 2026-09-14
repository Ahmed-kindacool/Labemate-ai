import { chromium } from 'playwright';

// Renders raw terminal output into a styled HTML terminal window and captures a PNG.
export async function generateTerminalScreenshot(output: string): Promise<Buffer> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // HTML template with CSS for a dark mode terminal
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            background: transparent;
            margin: 0;
            padding: 20px;
            display: inline-block;
          }
          .terminal-window {
            background-color: #1e1e1e;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            overflow: hidden;
            font-family: 'Courier New', Courier, monospace;
            min-width: 400px;
            max-width: 800px;
          }
          .terminal-header {
            background-color: #2d2d2d;
            padding: 10px 12px;
            display: flex;
            gap: 8px;
          }
          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }
          .dot.red { background-color: #ff5f56; }
          .dot.yellow { background-color: #ffbd2e; }
          .dot.green { background-color: #27c93f; }
          .terminal-body {
            padding: 16px;
            color: #d4d4d4;
            font-size: 14px;
            line-height: 1.5;
            white-space: pre-wrap; /* Preserves formatting and line breaks */
            word-wrap: break-word;
          }
        </style>
      </head>
      <body>
        <div class="terminal-window" id="terminal">
          <div class="terminal-header">
            <div class="dot red"></div>
            <div class="dot yellow"></div>
            <div class="dot green"></div>
          </div>
          <div class="terminal-body">${escapeHtml(output)}</div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(htmlContent);
  
  // Target the terminal div specifically to avoid capturing empty whitespace
  const terminalElement = page.locator('#terminal');
  const screenshotBuffer = await terminalElement.screenshot();

  await browser.close();
  return screenshotBuffer;
}

// Escapes HTML special characters to prevent rendering issues in the terminal output.
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
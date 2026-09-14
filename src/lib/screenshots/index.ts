import { chromium } from 'playwright';

export async function generateTerminalScreenshot(output: string): Promise<Buffer> {
  // Truncate unbounded output to prevent server crashes
  const safeOutput = output.length > 2000 
    ? output.substring(0, 2000) + '\n...[Output Truncated]' 
    : output;

  const browser = await chromium.launch({ headless: true });
  
  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { background: transparent; margin: 0; padding: 20px; display: inline-block; }
            .terminal-window { background-color: #1e1e1e; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4); overflow: hidden; font-family: 'Courier New', Courier, monospace; min-width: 400px; max-width: 800px; }
            .terminal-header { background-color: #2d2d2d; padding: 10px 12px; display: flex; gap: 8px; }
            .dot { width: 12px; height: 12px; border-radius: 50%; }
            .dot.red { background-color: #ff5f56; }
            .dot.yellow { background-color: #ffbd2e; }
            .dot.green { background-color: #27c93f; }
            .terminal-body { padding: 16px; color: #d4d4d4; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; }
          </style>
        </head>
        <body>
          <div class="terminal-window" id="terminal">
            <div class="terminal-header">
              <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
            </div>
            <div class="terminal-body">${escapeHtml(safeOutput)}</div>
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
    const terminalElement = page.locator('#terminal');
    return await terminalElement.screenshot();
  } finally {
    // Ensures Chromium closes even if page.setContent or screenshot() fails
    await browser.close();
  }
}

function escapeHtml(unsafe: string): string {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

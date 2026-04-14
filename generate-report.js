const marge = require('mochawesome-report-generator');
const { merge } = require('mochawesome-merge'); // <-- сюди
const fs = require('fs');
const path = require('path');

(async () => {
  const reportDir = path.resolve(__dirname, 'cypress/report');
  const finalDir = path.resolve(__dirname, 'cypress/report/final');

  if (!fs.existsSync(finalDir)) fs.mkdirSync(finalDir, { recursive: true });

  const json = await merge({ files: [path.join(reportDir, '*.json')] });

  await marge.create(json, {
    reportDir: finalDir,
    reportFilename: 'full-report.html',
    inline: true,
    charts: true,
    code: true
  });

  console.log('✅ Фінальний репорт створено: cypress/report/final/full-report.html');
})();
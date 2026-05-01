const fs = require('fs');

let content = fs.readFileSync('src/data/projects.ts', 'utf8');

// 1. LLM Generation Control
content = content.replace(
  '• Adaptive control loop (signal → decision → intervention)',
  '• Adaptive control loop (Token Distribution → Entropy Analysis → Policy Gate → Temperature/Regen Action)'
);
content = content.replace(
  'Prevents degenerate outputs and improves generation stability in real time.',
  'Prevents degeneration loops. Improves generation stability in real time by catching failure modes before they propagate.'
);

// 2. Drift-Aware Fraud Detection
content = content.replace(
  '• Drift detection (statistical distribution monitoring)\n• Performance tracking (AUC-based evaluation)\n• Model comparison (production vs candidate)\n• Explicit decision loop (retrain / no_action)',
  '• Drift detection (statistical distribution monitoring)\n• Performance tracking (AUC-based evaluation)\n• Complete ML system loop: Frozen Dataset → Behavioral Metrics (AUC, PSI) → Δ Analysis → Policy Gate (Business Loss < 0) → CI Promotion\n• Explicit decision loop (retrain / no_action)'
);
content = content.replace(
  'Result:\nEnsures model reliability over time by linking data drift to automated lifecycle management.',
  'Result:\nPrevents revenue loss from misclassification trade-offs. Candidate models are rejected if accuracy gains (+0.002 AUC) result in higher business loss (+7% higher false positive cost), ensuring threshold optimization always serves business objectives.'
);
content = content.replace(
  '"Complete ML system loop: training → serving → drift monitoring → threshold trigger → cooldown gate → retraining → shadow deployment → promotion",',
  '"Complete ML system loop: Frozen Dataset → Behavioral Metrics (AUC, PSI) → Δ Analysis → Policy Gate (Business Loss < 0) → CI Promotion",'
);

// 3. AI Quality Assurance
content = content.replace(
  'Full pipeline: enrichment → threshold sweep → policy application → queue ranking → provenance write',
  'Full pipeline: Extracted Text → Behavioral Metrics (ROUGE, Similarity) → Δ Analysis → Conservative AND Policy Gate → Priority-Scored Human Review'
);
content = content.replace(
  'The human review queue is not a flat list. Cases are ranked by a priority score derived from both metric deficits, so reviewers work the highest-risk outputs first. PII sanitization is applied before any data leaves the pipeline for external storage.',
  'The human review queue is not a flat list. Cases are ranked by a priority score derived from both metric deficits, so reviewers work the highest-risk outputs first. PII sanitization is applied before any data leaves the pipeline for external storage.\n\nResult:\nPrevents silent model degradation by guaranteeing failing narratives are caught before they reach downstream consumers.'
);

// We need to re-order the array so that AI QA is 3rd, and set its featured: true
// We'll just regex parse the projects array out and re-order it
// Actually, it's easier to just replace "featured: false," with "featured: true," for AI QA
content = content.replace(
  /slug: "ai-quality-assurance-financial-services",[\s\S]*?featured: false,/,
  match => match.replace('featured: false,', 'featured: true,')
);

// Now re-order the AI QA project to be 3rd.
// It's currently the last element in the array.
// Let's find the boundaries of the ai-qa object.
const aiQaStart = content.indexOf('  {\n    slug: "ai-quality-assurance-financial-services",');
const aiQaEnd = content.indexOf('  },\n];\n\nexport function getProject');
if (aiQaStart !== -1 && aiQaEnd !== -1) {
  const aiQaStr = content.substring(aiQaStart, aiQaEnd + 4); // Include the "  },\n"
  
  // Remove it from the end
  content = content.substring(0, aiQaStart) + content.substring(aiQaEnd + 4);
  
  // Insert it after drift-aware-fraud-detection object
  // Find where the drift-aware-fraud-detection object ends.
  // It ends right before "  {\n    slug: "indian-multilingual-llm","
  const driftEnd = content.indexOf('  {\n    slug: "indian-multilingual-llm",');
  if (driftEnd !== -1) {
    content = content.substring(0, driftEnd) + aiQaStr + content.substring(driftEnd);
  }
}

fs.writeFileSync('src/data/projects.ts', content, 'utf8');
console.log("Rewrote src/data/projects.ts successfully.");

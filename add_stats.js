const fs = require('fs');
let code = fs.readFileSync('src/components/Projects.tsx', 'utf8');

const aiQaStats = `
                {project.featured && project.slug === "ai-quality-assurance-financial-services" && (
                  <div
                    className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-px border rounded-lg overflow-hidden"
                    style={{ borderColor: "var(--border)", background: "var(--border)" }}
                  >
                    {[
                      { label: "False Positives", value: "0.0%", color: "#22c55e" },
                      { label: "Policy", value: "AND", color: "var(--accent)" },
                      { label: "Auto-regen", value: "< 5%", color: "#f59e0b" },
                      { label: "Audit Trail", value: "Live", color: "#60a5fa" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="px-3 py-2.5"
                        style={{ background: "var(--surface)" }}
                      >
                        <div className="font-mono text-xs font-semibold" style={{ color: stat.color }}>
                          {stat.value}
                        </div>
                        <div className="font-mono text-[10px] mt-0.5" style={{ color: "var(--muted-fg)" }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
`;

// Insert it right after the drift-aware-fraud-detection block
const anchor = '{project.featured && project.slug === "drift-aware-fraud-detection" && (';
// Let's find the closing of that block
const driftEndStr = ')}';
// This is fragile. Let's just find the end of the drift block.
// Wait, let me read the whole file into an array and splice it.

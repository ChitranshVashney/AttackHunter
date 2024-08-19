import { exec } from "child_process";
import fs from "fs";

// Function to save the Slither report to a Markdown file
function saveReportToMarkdown(reportData) {
  const fileName = "slither_reports.md";

  // Format the report data as Markdown
  const reportContent = `
## Slither Analysis Report

**Project Root:** ${reportData.projectRoot}  
**Timestamp:** ${reportData.timestamp}



### Output
${reportData.stdout}
${reportData.stderr}
`;

  // Append the report content to the Markdown file
  fs.appendFileSync(fileName, reportContent);

  console.log("Slither report saved to Markdown file successfully.");
}

function formatSlitherReport(stderr) {
  const lines = stderr.split("\n");
  const formattedLines = [];

  lines.forEach((line) => {
    // Remove lines with 'running (wd:' or starting with 'INFO:Slither:' or 'forge'
    if (
      line.includes("running (wd:") ||
      line.startsWith("INFO:Slither:") ||
      line.startsWith("'forge")
    ) {
      return;
    }

    // Clean up unnecessary spacing
    const cleanLine = line.trim();

    // Add formatting to highlight the detectors
    if (cleanLine.startsWith("INFO:Detectors:")) {
      formattedLines.push("\n **Detectors Found** \n");
    } else if (cleanLine) {
      formattedLines.push(cleanLine);
    }
  });

  return formattedLines.join("\n");
}

// Function to run Slither analysis on the specified contract
export default async function runSlitherAnalysis() {
  // Run the Slither analysis and capture both stdout and stderr
  exec(
    `cd ${"../upgradableContracts"} && slither .`,
    (error, stdout, stderr) => {
      // Prepare the report data

      let a = formatSlitherReport(stderr);
      const reportData = {
        projectRoot: "../upgradableContracts",
        timestamp: new Date().toISOString(),
        stdout: stdout, // Capturing standard output from Slither
        stderr: a, // Capturing any error output
      };

      // Save the report data to a Markdown file
      saveReportToMarkdown(reportData);

      console.log("Slither analysis complete.");
    }
  );
}
runSlitherAnalysis();

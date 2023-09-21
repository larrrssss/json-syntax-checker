import * as core from '@actions/core';
import path from 'path';
import fs from 'fs';

import loadInputs from './inputs';
import { getPathsRecursively } from './utils';

(async () => {
  try {
    const { BASE } = loadInputs();
    const workspace = path.join(
      // Path from actions/checkout@v3
      core.getInput('workspace', {
        required: true,
      }),
      BASE,
    );

    const failedFiles = [];

    const jsonFiles = await getPathsRecursively(workspace);

    for (const file of jsonFiles) {
      const content = (await fs.promises.readFile(file)).toString();

      try {
        JSON.parse(content);
      } catch (e) {
        failedFiles.push({
          path: file,
          error: e,
        });
      }
    }

    core.setOutput(
      'failed_files',
      failedFiles.length ? failedFiles.map((f) => f.path) : [],
    );

    if (failedFiles.length) {
      const errorMessage = failedFiles.reduce(
        (p, c) => `${p}${c.path}: ${c.error}\n`,
        '',
      );
      core.setFailed(errorMessage);
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
})();

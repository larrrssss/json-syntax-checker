import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';

import loadInputs from './inputs';

export const getPathsRecursively = async (p: string): Promise<string[]> => {
  const paths = [];
  const { CHECK_RECURSIVELY } = loadInputs();

  try {
    const result = await fs.promises.readdir(p);

    for (const f of result) {
      if (['json'].includes(f.split('.').pop() ?? '')) {
        core.info(`Found file ${f}`);
        paths.push(path.join(p, f));
      } else {
        if (CHECK_RECURSIVELY)
          paths.push(...(await getPathsRecursively(path.join(p, f))));
      }
    }

    return paths;
  } catch (e) {
    return [];
  }
};

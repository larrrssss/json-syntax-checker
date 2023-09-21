import * as core from '@actions/core';

const inputs = {
  BASE: '/',
  CHECK_RECURSIVELY: true,
};

const loadInputs = () =>
  Object.keys(inputs).reduce(
    (p, c) =>
      Object.assign(p, {
        [c]: core.getInput(c.toLowerCase()) || inputs[c as keyof typeof inputs],
      }),
    {} as Record<keyof typeof inputs, string>,
  );

export default loadInputs;

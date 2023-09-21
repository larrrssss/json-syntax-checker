# JSON Sytnax Checker GitHub Action

GitHub Action to check all .json files for the correct format.

## Usage

To use this action, you can add the following snippet to your GitHub Actions workflow file (e.g., `.github/workflows/json-syntax-checker.yml`):

```yaml
name: JSON Syntax Checker

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  syntax_check:
    name: JSON Syntax Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
        with:
          ref: main

      - name: Syntax Check
        uses: larrrssss/json-syntax-checker@v1.0.0
        with:
          workspace: ${{ github.workspace }}
          base: '/'
          check_recursively: true
```

## Inputs

| Name                 | Description                         | Required | Default         |
|:---------------------|-------------------------------------|:--------:|-----------------|
| `workspace`          | GitHub `$GITHUB_WORKSPACE` variable | &check;  |                 |
| `base`               | Change the base path for all paths  | &cross;  | '/'             |
| `check_recursively`  | Whether all nested paths should be checked recursively  | &cross; | `true` |

## Outputs

- `failed_files`: A list of invalid .json files

## License

This action is licensed under the [MIT License](LICENSE).

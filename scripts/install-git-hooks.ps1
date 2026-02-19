# Install git hooks for this project (strips Cursor co-author from commits)
$hookSource = Join-Path $PSScriptRoot "prepare-commit-msg"
$hookDest = Join-Path (Get-Location) ".git\hooks\prepare-commit-msg"

if (-not (Test-Path ".git\hooks")) {
  Write-Error "Not a git repository. Run from project root."
  exit 1
}

Copy-Item $hookSource $hookDest -Force
Write-Host "Git hook installed: prepare-commit-msg (strips Cursor co-author)"
Write-Host "Your commits will no longer include Cursor attribution."

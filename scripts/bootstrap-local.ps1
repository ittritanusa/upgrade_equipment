param(
    [switch]$RefreshEnv,
    [switch]$Fresh,
    [switch]$WithFrontendWatch
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$envPath = Join-Path $repoRoot '.env'
$templatePath = Join-Path $repoRoot '.env.local.example'

if ($RefreshEnv -or -not (Test-Path $envPath)) {
    Copy-Item -Path $templatePath -Destination $envPath -Force
}

if ($Fresh) {
    docker compose -f docker-compose.local.yml down -v
}

docker compose -f docker-compose.local.yml up -d --build mariadb redis app
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

docker compose -f docker-compose.local.yml run --rm frontend-builder
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

if ($WithFrontendWatch) {
    docker compose -f docker-compose.local.yml --profile frontend-watch up -d node
    if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
    }
}

Write-Host 'Local stack is ready.'
Write-Host 'App:' 'http://local.fms-lvl/' 'and' 'http://localhost:8000/'
if ($WithFrontendWatch) {
    Write-Host 'Vite watch:' 'http://local.fms-lvl:5173/'
}

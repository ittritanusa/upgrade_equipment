param(
    [Parameter(Mandatory = $true)]
    [string]$BaseUrl,

    [Parameter(Mandatory = $true)]
    [string]$Username,

    [Parameter(Mandatory = $true)]
    [string]$Password
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession

Invoke-WebRequest -Uri "$BaseUrl/" -WebSession $session -UseBasicParsing | Out-Null

$xsrfCookie = $session.Cookies.GetCookies($BaseUrl) |
    Where-Object { $_.Name -eq 'XSRF-TOKEN' } |
    Select-Object -First 1

if (-not $xsrfCookie) {
    throw 'XSRF-TOKEN cookie was not returned by the application.'
}

$xsrfToken = [Uri]::UnescapeDataString($xsrfCookie.Value)
$jsonHeaders = @{
    Accept             = 'application/json'
    'Content-Type'     = 'application/json'
    'X-Requested-With' = 'XMLHttpRequest'
    'X-XSRF-TOKEN'     = $xsrfToken
}

$loginBody = @{
    username = $Username
    password = $Password
} | ConvertTo-Json -Compress

$loginResponse = Invoke-WebRequest `
    -Uri "$BaseUrl/api/auth/login" `
    -Method Post `
    -WebSession $session `
    -Headers $jsonHeaders `
    -Body $loginBody `
    -UseBasicParsing

$meResponse = Invoke-WebRequest `
    -Uri "$BaseUrl/api/auth/me" `
    -WebSession $session `
    -Headers @{
        Accept             = 'application/json'
        'X-Requested-With' = 'XMLHttpRequest'
    } `
    -UseBasicParsing

$unitResponse = Invoke-WebRequest `
    -Uri "$BaseUrl/api/unit-kendaraan?search=&limit=10" `
    -WebSession $session `
    -Headers @{
        Accept             = 'application/json'
        'X-Requested-With' = 'XMLHttpRequest'
    } `
    -UseBasicParsing

$tipeResponse = Invoke-WebRequest `
    -Uri "$BaseUrl/api/tipe-kendaraan?search=&limit=10" `
    -WebSession $session `
    -Headers @{
        Accept             = 'application/json'
        'X-Requested-With' = 'XMLHttpRequest'
    } `
    -UseBasicParsing

Write-Host ('LOGIN_STATUS=' + [int]$loginResponse.StatusCode)
Write-Host ('ME_STATUS=' + [int]$meResponse.StatusCode)
Write-Host ('UNIT_STATUS=' + [int]$unitResponse.StatusCode)
Write-Host ('TIPE_STATUS=' + [int]$tipeResponse.StatusCode)

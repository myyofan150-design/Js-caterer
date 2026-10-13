Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$distPath = (Resolve-Path "dist").Path
$zipPath = Join-Path (Resolve-Path ".").Path "js-caterer-hostinger-deploy.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$archive = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

Get-ChildItem -Path $distPath -Recurse -File -Force | ForEach-Object {
    $fullPath = $_.FullName
    $relPath = $fullPath.Substring($distPath.Length + 1).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $fullPath, $relPath, [System.IO.Compression.CompressionLevel]::Optimal)
}

$archive.Dispose()

Copy-Item $zipPath "js-caterer-production.zip" -Force
Write-Host "SUCCESS: Created $zipPath with forward-slash Unix paths!"

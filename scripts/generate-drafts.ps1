param(
  [string]$WorksDir = "works",
  [string]$ConfigPath = "configs/platforms.json",
  [string]$OutputDir = "drafts"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $ConfigPath)) {
  throw "Missing platform config: $ConfigPath"
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

$config = Get-Content -Raw -Path $ConfigPath -Encoding UTF8 | ConvertFrom-Json
$platforms = @{}
foreach ($platform in $config.platforms) {
  $platforms[$platform.id] = $platform
}

$workFiles = Get-ChildItem -Path $WorksDir -Filter "*.work.json" -File
if ($workFiles.Count -eq 0) {
  Write-Host "No work files found in $WorksDir"
  exit 0
}

function Limit-Text {
  param(
    [string]$Text,
    [int]$MaxLength
  )

  if ([string]::IsNullOrWhiteSpace($Text) -or $Text.Length -le $MaxLength) {
    return $Text
  }

  return $Text.Substring(0, [Math]::Max(0, $MaxLength - 3)) + "..."
}

foreach ($file in $workFiles) {
  $work = Get-Content -Raw -Path $file.FullName -Encoding UTF8 | ConvertFrom-Json
  $workOutDir = Join-Path $OutputDir $work.id
  New-Item -ItemType Directory -Force -Path $workOutDir | Out-Null

  foreach ($platformId in $work.platforms) {
    if (-not $platforms.ContainsKey($platformId)) {
      Write-Warning "Unknown platform '$platformId' in $($file.Name)"
      continue
    }

    $platform = $platforms[$platformId]
    $title = Limit-Text -Text $work.title -MaxLength $platform.titleMaxLength
    $tagPrefix = if ($platform.tagStyle -eq "hash") { "#" } else { "" }
    $tags = ($work.tags | ForEach-Object { "$tagPrefix$_" }) -join " "

    $bodyParts = @(
      $work.hook,
      "",
      $work.summary,
      "",
      $platform.cta,
      "",
      $tags
    )
    $body = Limit-Text -Text (($bodyParts -join "`r`n").Trim()) -MaxLength $platform.bodyMaxLength

    $draft = @"
# $($platform.name) Publish Draft

Work ID: $($work.id)
Status: $($work.status)

## Title

$title

## Body

$body

## Traffic Target

$($work.targetUrl)

## Assets

$($work.assets -join "`r`n")

## Notes

$($work.notes)
"@

    $outPath = Join-Path $workOutDir "$platformId.md"
    Set-Content -Path $outPath -Value $draft -Encoding UTF8
    Write-Host "Generated $outPath"
  }
}

$outputFile = "$PSScriptRoot\package.zip"

Compress-Archive -Path "$PSScriptRoot\manifest.json","$PSScriptRoot\seticon.js" -DestinationPath $outputFile -Force
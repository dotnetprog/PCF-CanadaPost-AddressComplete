Write-Host "1. Compiling PCF with build mode"

Push-Location "..\pcf-fluentui-addresscomplete"
& npm run dist
Rename-Item -Path "out\controls\addresscomplete\bundle.js" -NewName "bbundle.js"
Pop-Location


Write-Host "2. Exporting solution..."
$solutionName = "CanadaPostAddressComplete";
$solutionManagedName = $solutionName+"_managed";
& pac solution export --path "$solutionName.zip" --name $solutionName --managed false -ow -a -env https://pcflab.crm3.dynamics.com
& pac solution export --path "$solutionManagedName.zip" --name $solutionName --managed true -ow -env https://pcflab.crm3.dynamics.com

Write-Host "3. Unpacking solution..."
& pac solution unpack --zipfile "$solutionName.zip" --folder package -ad -aw -p Both

Write-Host "4. Deleting bundle from controls folder"
Remove-Item -Path "package\Controls\fdn_fdn.addresscomplete\bundle.js" -Force -ErrorAction Ignore

Write-Host "5. Packing solution..."
& pac solution pack --zipfile "$solutionName.zip" --folder package -ad -aw -p Both -m package_map.xml

    
# Lê o .env e sobe o Spring Boot
Get-Content .env | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
        $varName = $matches[1].Trim()
        $varValue = $matches[2].Trim()
        Set-Item -Path "env:$varName" -Value $varValue
        Write-Host "Carregado: $varName"
    }
}

Write-Host "Subindo o Spring Boot..." -ForegroundColor Green
.\gradlew.bat bootRun

# Script de inicialización para DMLPOS (sin Docker)

Write-Host "Instalando dependencias del backend..."
foreach ($service in @("api-gateway", "auth-service", "user-service", "order-service", "inventory-service", "payment-service", "notification-service", "analytics-service", "billing-service")) {
    if (Test-Path "backend/$service") {
        Set-Location "backend/$service"
        npm install
        Set-Location ../..
    }
}

Write-Host "Instalando dependencias del frontend..."
Set-Location frontend
npm install
Set-Location ..

Write-Host "Asegúrate de que PostgreSQL esté corriendo en localhost:5432 con usuario 'admin' y password 'password'"
Write-Host "Crea la base de datos 'dmlpos' si no existe"
Write-Host "Base de DMLPOS lista para desarrollo."
@echo off
chcp 65001 >nul
title StockRadar AI - Iniciar Localmente
color 0B

echo =====================================================================
echo          STOCKRADAR AI - SERVIDOR LOCAL (PC)
echo =====================================================================
echo.
cd /d "C:\Users\User\Documents\Projetos\AI Stock Assistant App"

echo A iniciar servidor Python API na porta 8000...
start "StockRadar Python API" /min cmd /c "python -u server.py"

echo A iniciar Vite Dev Server na porta 3000...
start "StockRadar Vite Web" cmd /c "npm run dev -- --port 3000"

timeout /t 2 >nul
echo.
echo Servidores iniciados!
echo A abrir http://localhost:3000 no teu browser...
start http://localhost:3000
echo.

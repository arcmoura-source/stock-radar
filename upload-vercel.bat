@echo off
chcp 65001 >nul
title StockRadar AI - Deploy para Vercel & Telemóvel
color 0A

echo =====================================================================
echo          STOCKRADAR AI - UPLOAD DIRETO PARA O VERCEL
echo =====================================================================
echo.
echo  A preparar o teu portfólio e radar de notícias para a Cloud...
echo.

cd /d "%~dp0"

echo [1/3] A verificar compilação de produção (npm run build)...
call npm run build
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERRO] Falha ao compilar a app. Verifica os ficheiros.
    pause
    exit /b %errorlevel%
)
echo.
echo [OK] Compilação concluída com sucesso!
echo.

echo [2/3] A iniciar ligação e upload para a Vercel...
echo (Se for a primeira vez, o Vercel vai pedir login no browser ou confirmar o projeto).
echo.
echo Pressione qualquer tecla para continuar...
echo.

call npx vercel --prod

echo.
echo =====================================================================
echo            APP PUBLICADA COM SUCESSO NO VERCEL!
echo =====================================================================
echo.
echo  COMO COLOCAR A APP NO TEU TELEMÓVEL (IPHONE OU ANDROID):
echo.
echo   1. Copia o link que o Vercel mostrou acima (ex: https://stock-radar-xxx.vercel.app)
echo   2. Abre esse link no browser do teu telemóvel (Safari no iPhone ou Chrome no Android).
echo.
echo   3. PARA FICAR COMO UMA APP NATIVA NO TEU ECRÃ:
echo      - No iPhone (Safari):
echo        Clica no botão de "Partilhar" (quadrado com seta para cima)
echo        e escolhe "Adicionar ao Ecrã Principal" (Add to Home Screen).
echo.
echo      - No Android (Chrome):
echo        Clica nos 3 pontinhos no canto superior direito
echo        e escolhe "Adicionar ao ecrã inicial" ou "Instalar aplicação".
echo.
echo   Pronto! A app StockRadar fica com ícone próprio no teu telemóvel,
echo   abre em ecrã inteiro e sincroniza em tempo real na Cloud!
echo =====================================================================
echo.
pause

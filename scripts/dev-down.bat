@echo off
echo Stopping Project Master...
cd /d "%~dp0.."
docker compose -f docker-compose.dev.yml down

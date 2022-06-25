# Makefile

install: # Выполняется установка зависимостей
				npm ci
lint: # Проект проверяется линтером
		npx eslint .
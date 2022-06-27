# Makefile

install: # Выполняется установка зависимостей
				npm ci
lint: # Проект проверяется линтером
		npx eslint .
test: 
	NODE_OPTIONS=--experimental-vm-modules npx jest
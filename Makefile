# Makefile

install: # Выполняется установка зависимостей
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .
	
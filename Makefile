.PHONY: build test
MAKEFLAGS += --silent

NEXT=pnpm next

## generate
generate: generate-webmanifest generate-sitemap

generate-webmanifest:
	pnpm script/site/webmanifest.ts

generate-sitemap:
	pnpm next-sitemap

## deployment
deploy-staging: build-staging
	vercel

deploy-production: build-production
	vercel --prod

clear-cache:
	rm -rf .next

start-development: clear-cache
	$(NEXT) dev

start-staging: clear-cache start

start-production: clear-cache start

## build
build-development: clear-cache build

build-production: clear-cache build generate

build-staging: clear-cache build

build-testing: clear-cache build

build:
	$(NEXT) build

## start
start:
	$(NEXT) start $(arguments)

## format
prettify:
	pnpm prettier --ignore-path .gitignore --$(type) **/*.{mjs,tsx,ts,json,md}

format-check:
	make prettify type=check

format:
	make prettify type=write

## lint
lint:
	pnpm eslint src/ test/ -f='stylish' --color && pnpm knip

## typecheck
typecheck:
	pnpm tsc -p tsconfig.json $(arguments) 

## test
test-type:
	pnpm vitest test/$(path)/**.test.ts $(arguments)

test-unit:
	make test-type path="unit" arguments="$(arguments)"

test-integration:
	make test-type path="integration" arguments="$(arguments)"

test-snapshot:
	make test-type path="snapshot" arguments="$(arguments)"

test: test-unit build-testing test-integration test-snapshot

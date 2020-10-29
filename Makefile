.PHONY: help pep8 install deploy release startdev
.DEFAULT_GOAL= help

#include .env
#export $(shell sed 's/=.*//' envfile)
PORT?=8000
HOST?=127.0.0.1
COM_COLOR   = \033[0;34m
OBJ_COLOR   = \033[0;36m
OK_COLOR    = \033[0;32m
ERROR_COLOR = \033[0;31m
WARN_COLOR  = \033[0;33m
NO_COLOR    = \033[m

APP_VERSION = $(shell date +"%Y%m%d%H%M")
APP_NAME = "modabyflora-ecommerce"
HEROKU_APP_NAME = "modabyflora-ecommerce"
LATEST_RELEASE = $(shell ls -tp -w 1 *zip | head --lines=1)


help:
	@awk 'BEGIN {FS = ":.*##"; } /^[a-zA-Z_-]+:.*?##/ { printf "$(PRIMARY_COLOR)%-20s$(NO_COLOR) %s\n", $$1, $$2 }' $(MAKEFILE_LIST) | sort


startdev: ## Start the development server
	@echo "Starting $(OK_COLOR)nodemon$(NO_COLOR) process to ease development"
	bundle exec jekyll serve -w --incremental

generate-products: ## Generates the html pages that corresponds to each product.
	python ./generate_products.py


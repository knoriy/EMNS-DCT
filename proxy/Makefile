# set user
user 					= 1000:1000

# docker image and container details
Docker_name				= $(shell whoami)/nginx_reverse_proxy
container_name 			= nginx_reverse_proxy

# forwards ports
ports 					= -p 80:80 -p 443:443

build:
	@docker build . -t $(Docker_name)

no_cache:
	@docker build . -t $(Docker_name) --no-cache

bash:
	@docker run -it --rm --gpus=all $(ports) -v $(volume_dir) -v $(dataset_dir) --name $(container_name) $(Docker_name) sh || docker exec -it $(container_name) sh

run:
	@docker run -it --rm --gpus=all $(ports) -v $(volume_dir) -v $(dataset_dir) --name $(container_name) $(Docker_name) || docker exec -it $(container_name) sh

reset_migrations:
	@find . -path "*/*/migrations/*.py" -not -name "__init__.py" -delete
	@find . -path "*/*/migrations/*.pyc"  -delete
	@python django_dataset_collection_tool/manage.py makemigrations
	@python django_dataset_collection_tool/manage.py migrate
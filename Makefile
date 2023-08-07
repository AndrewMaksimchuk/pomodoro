.PHONY: start build run install remove update

start:
	npm run start

build:
	rm -rf ./out
	npm run make

run:
	cd ./out/pomodoro-linux-x64 && ./pomodoro

install:
	cd ./out/make/deb/x64 && sudo apt install ./*.deb

remove:
	sudo apt remove pomodoro

update: remove install

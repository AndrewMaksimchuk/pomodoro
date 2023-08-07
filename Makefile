.PHONY: start build run install remove update

start:
	npm run start

build:
	rm -rf ./out
	npm run make

run:
	cd ./out/pomodoro_timer-linux-x64 && ./pomodoro_timer

install:
	cd ./out/make/deb/x64 && sudo apt install ./pomodoro-timer_1.1.0_amd64.deb

remove:
	sudo apt remove pomodoro-timer

update: remove install

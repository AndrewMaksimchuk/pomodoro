# :tomato: Pomodoro

The Pomodoro method is a time management method developed by Francesco Cirillo in the late 1980s.  
This method uses a timer to break down the work into 25-minute intervals  
called "pomodori" (Italian word meaning "tomatoes") and separated by short breaks.  

This simple program locks the screen every 25 minutes and takes a break of 5 minutes,  
which will give you the opportunity to take a break and freshen up a bit.  

Built on :electron: [Electron](https://www.electronjs.org/).  

To run the program you need:
1. clone the repository, go to the folder named `pomodoro`
2. then open a terminal in it (command line)
3. in the terminal enter the command `npm i`
4. now you can run the program through the terminal with the command `npm run start` or `make`  

No settings, just run and go :footprints:  
![](pomodoro.jpg)  

## Commands:
- Take a break - start new 5 minute break
- Skip         - skip break
- Add exercise - add a sports exercise
- Relaunch     - restart the entire program
- Exit         - close this application  

## Settings
- Show exercises - if checked, show on break time  
                   random selected exercise  
- Show exercise of the day - if checked, show on  
                   today exercise  

For get today exercise, use [darebee.com](https://www.darebee.com/)

`Makefile` containe commands for developers, like  
run and build.  

## Environment variables

POMODORO_DEV - Open devtools in render process  

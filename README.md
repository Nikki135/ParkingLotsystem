# ParkingLotsystem
Logic and abstractions used:
Database Used: Firebase Realtime Database(Any database can be used)
Languages: Javascript
# For Allocating Parking Slot:
1. Taking the user input: Registration Number, Vehicle Type
2. In order to asiign a parking slot for each vehicle, I created a 2-D Array which has l number of levels and r number of rows in each level.
3. In case, the vehicle is a bus, it will be able to occupy only the first 5 slots in the level. If it exceeds 5, it will exit the loop and got t next level
4. The buses and motorcycles are distributed into half in the remaining spots in each level
5. In order to prevent, redefining the array every time we submit, I saved the array in localstorage and reused the same array once another request is made. This is done in order to acknowledge the already occupied parking lots
# For fetching the Parking Slot based on the Registration number
1. After taking the input from the user, the level and row number are looked for in the database and then displayed

# TFT-Builder
The TFT-builder web app using React Framework that allow the user to simulate teamfight tatics army building experience and get summarized information about it.

## Teamfight Tatics
TFT is a round-based strategy game that pits you against seven opponents in a free-for-all race to build a powerful team that fights on your behalf. Your goal: Be the last person standing.
for more info check : https://euw.leagueoflegends.com/en/featured/events/teamfight-tactics

## Web app
This app allow the user to test thier new stratgies and match them up aganist other stratgies, also share stratgies with other players and get some helpful information and hints.

The idea of a stratgey game simulator requires many dynamic components and complicated css styles to reflect the game feelings, using React allows for managing dynamic components in a clean and easy way

## Main Features
Link to the deployed app:
https://tft-builder.abdullaashraf.now.sh/

This is a list of some features you can play with in the simulator if you are not familiar with the game:
### Add champions to your board
The user can filter the champions in the shop below the board and add any champion he likes to the board by simply clicking on it.
Note that having 3 champions of the same type and level will upgrade them to one of higher level up to level 3.
Max number of champions allowed by default is 9, but you can incrase that number using special items.

### Champion Details
Click on any champion on the grid to view more details about that champion stats and ability.

### Moving and swaping champions on the grid
By dragging and dropping champions on teh grid the user can rearrange his board however they see fit.
Also dragging a champion back to the shop will remove them from the grid.

### Synergies (Origins and Classes)
As in the game itself each champion have their own origin and one or more classes, having unique champions that share an origin or a class on the board at the same time will unlock some power synergies which can empower those champions or the whole army, you can check which synergies you have so far by observing the synergies area on the left, it will indicate how many of them you have and at which number you can unlock the next level

### Items
Users have the ability to add items to any champ, all basic items are avaliable on the bottom left of the app, and the user can drag and drop those items on any champion to equip it with that item.
Notes:
* Every champion can have max of 3 items at any time.
* Merging any 2 basic items will result in a new item that has some unique abilites.
* Merging champions for a higher level also merge their items.
        
### Builds
When a user is done with their build they can give it a name and save it so they and other people can check it later.
Any user can view all builds saved so far and remove them or fork them and do their own modifications.

### Features to be added
* Add items and synergies details tab
* Allow to level up champions with an easier way
* Add users and authontication the app so each user can only edit and delete their own builds
* Allow users to vote builds up or down
* Enable the user to share his build using a simple link
* Show general stats releated to the whole board
* Allow maker to indicate how their build match aganist other common builds
* Filter and sort builds

## Server-side
The data used in this app comes from a back-end API developed using MongoDB and Node.js Express, since the game is always getting patches of balances and improvements using an external database allow for fast and easy data modifications, check more about the server-side app here : https://github.com/abdullaAshraf/TFT-Builder-Server 

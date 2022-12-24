# The Pig Game

The Pig Game made using HTML, CSS, JavaScript and ReactJs. This project was generated with [Create React App](https://github.com/facebook/create-react-app)
<br>
Note: This website uses [React.JS v18.2.0](https://github.com/facebook/react/blob/main/CHANGELOG.md#1820-june-14-2022)

## Description

This is Pig game, playable with 2 players. Learn more about concept of Pig Game in general from [Here](<https://en.wikipedia.org/wiki/Pig_(dice_game)>)

## Rules of Game

As Pig Game itself has lots of different varients with different sets of rules, This Game also follows some set of rules.

1. Only 2 User can play this game.
2. This game will be played with one dice only.
3. One Player will keep getting turn until dice rolls to a 1.
4. Any Dice rolls except 1 will get added to the current points of player, who is currently rolling the dice.
5. In every turn player can either choose to play another turn or player can hold points collected by previous turn.
6. If player chooses to hold points, all the points collected by previous turns will be added to player's actual score but player will loose the turn.
7. If player chooses to keep playing, then that points will not be added to actual score.
8. If dice rolls to a 1, turn will be switched to second player and all the collected score of previous player will be lost.

By Abiding above rules, Any player who gets score of 100 first will be declared as winner.

## Demo

Here is the [Demo of website](https://the-pig-game-theta.vercel.app/)
<br>
Deployed using [Vercel](https://vercel.com/)

## Built With

- <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
- <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
- <img src="https://img.shields.io/badge/HTML5%20-%23e34f26.svg?&style=for-the-badge&logo=html5&logoColor=white" />
- <img src="https://img.shields.io/badge/CSS3-1572B6?&style=for-the-badge&logo=css3&logoColor=white" />

## Screenshots

<details>
  <summary>Click to see screenshots</summary>
  <br>
  <img src='/public/screenshots/home.png'></img>
  <img src='/public/screenshots/playing.png'></img>
  <img src='/public/screenshots/won.png'></img>
</details>

## Getting Started

### Prerequisites

1. [Node.js v16.17.0 and UP](https://nodejs.org/en/) (LTS Version Recommanded)

### Build

If anyone wants to test this project, user can do so by following below instruction.

- Download source code and extract anywhere into the PC.
- Open Terminal where project is extracted and then run following command

```
npm install
```

- After npm installs all dependency, user can run below command to see project in action.

```
npm start
```

- If Above command is working correctly then user can build this project by using below command.

```
npm run build
```

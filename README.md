# SpireBot-Discord

Discord bot NodeJS <br>
<br>
Run with `node bot.js`

## Configuration

Create a `.env` file from the `.env-sample` and fill in the variables <br>

- **BOTTOKEN**: is the discord bot token from developer portal <br>
- **COMMANDSYMBOL**: symbol used for command recognition <br>
- **TENORAPIKEY**: api key from Tenor for gif search <br>

## Commands

- pp
  > Sends /tts P P to same channel <br>
- summon
  > Sends one of the following to same channel (no quotes): <br>
  > "🤖 BEEP BOOP 🤖", "🤖🤖🤖🤖", "🤖 REPORTING FOR DUTY 🤖", "🤖 NO THANK YOU 🤖" <br>
- gif
  > Sends a gif eith the specified keywords, or with keywords "beep boop" if none was specified <br>
  > Syntax: <br>
  > gif **_keywords_** <br>
  > example: <br> > `!gif cute kittens`

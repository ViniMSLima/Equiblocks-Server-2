const express = require("express");
const player2 = require("../src/routes/player2");
const challenge = require("../src/routes/challenge");

module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/api", player2)
    .use("/challenge", challenge)
};

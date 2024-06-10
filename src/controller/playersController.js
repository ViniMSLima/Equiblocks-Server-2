const { Player2 } = require("../models/player2");
const { Process } = require("../models/process");

require("dotenv").config();

class PlayerController {
    static async getPlayers(req, res) {
        try {
            const players = await Player2.find();
            return res.status(200).send({ players });
        } catch (error) {
            return res.status(404).send({ error: 'Players not found!' });
        }
    }

    static async postPlayer(req, res) {
        const { nome, data, tempo, f1, f2, f3, f4, f5, tentativas, qtd_formas, acertos } = req.body;

        if (!nome || !data || !tempo || !f1 || !f2 || !f3 || !f4 || !f5)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        const process = await Process.findOne({ status: 'ativo' });

        if (!process) {
            return res.status(404).send({ error: 'Process not found' });
        }

        const player = new Player2({
            nome,
            data,
            tempo,
            f1,
            f2,
            f3,
            f4,
            f5,
            tentativas,
            qtd_formas,
            processo: process._id,
            acertos,
            release: Date.now(),
            createdAt: Date.now(),
        });

        try {
            await player.save();
            res.status(201).send({ message: 'Player registered successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a player' });
        }

    }

    static async clearPlayers(req, res) {
        try {
            await Player2.deleteMany({});
            return res.status(200).send({ message: 'All players deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing players' });
        }
    }

}

module.exports = PlayerController;

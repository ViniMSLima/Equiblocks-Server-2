require("dotenv").config();

let status = false;

class ChallengeController {
    static async getstatus(req, res) {
        try {
            return res.status(200).send({ status });
        } catch (error) {
            return res.status(404).send({ error: 'Error while getting status' });
        }
    }

    static async start(req, res) {
        try {
            status = true;
            return res.status(200).send({ status });
        } catch (error) {
            return res.status(404).send({ error: 'Error while starting' });
        }
    }

    static async stop(req, res) {
        try {
            status = false;
            return res.status(200).send({ status });
        } catch (error) {
            return res.status(404).send({ error: 'Error while stopping' });
        }
    }
}

module.exports = ChallengeController;

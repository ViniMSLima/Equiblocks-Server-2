require("dotenv").config();

let status = false;
let timer = null;

let F1 = 100;
let F2 = 200;
let F3 = 500;
let F4 = 700;
let F5 = 1000;

let values = [100, 200, 500, 700, 1000]

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
            if (!status) {
                status = true;
                // Inicia a contagem de 30 minutos apenas se ainda não estiver em andamento
                // if (!timer) {
                //     timer = setTimeout(() => {
                //         status = false;
                //         timer = null;
                //     }, 2100000); // 35 minutos em milissegundos
                // }
                return res.status(200).send({ status });
            } else {
                return res.status(200).send({ status });
            }
        } catch (error) {
            return res.status(404).send({ error: 'Error while starting' });
        }
    }

    static async stop(req, res) {
        try {
            status = false;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            return res.status(200).send({ status });
        } catch (error) {
            return res.status(404).send({ error: 'Error while stopping' });
        }
    }

    static async postValues(req, res) {
        const { newValues } = req.body;

        if (!newValues)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        try {
            values = newValues
            res.status(201).send({ message: 'Values registered successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while registering values' });
        }
    }

    static async getValues(req, res) {
        try {
            return res.status(200).send({ values });
        } catch (error) {
            return res.status(404).send({ error: 'Error while getting values' });
        }
    }
}

module.exports = ChallengeController;

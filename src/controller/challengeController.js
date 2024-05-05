require("dotenv").config();

let status = false;
let timer = null;

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
                if (!timer) {
                    timer = setTimeout(() => {
                        status = false;
                        timer = null;
                    }, 1800000); // 30 minutos em milissegundos
                }
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
}

module.exports = ChallengeController;

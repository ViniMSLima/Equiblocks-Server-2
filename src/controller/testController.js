require("dotenv").config();

let statusTeste = false;
let timerTeste = null;

class TestController {
    static async getstatusteste(req, res) {
        try {
            return res.status(200).send({ statusTeste });
        } catch (error) {
            return res.status(404).send({ error: 'Error while getting status' });
        }
    }

    static async startTeste(req, res) {
        try {
            if (!statusTeste) {
                statusTeste = true;
                // Inicia a contagem de 5 minutos apenas se ainda não estiver em andamento
                if (!timerTeste) {
                    timerTeste = setTimeout(() => {
                        statusTeste = false;
                        timerTeste = null;
                    }, 300000); // 5 minutos em milissegundos
                }
                return res.status(200).send({ statusTeste });
            } else {
                return res.status(200).send({ statusTeste });
            }
        } catch (error) {
            return res.status(404).send({ error: 'Error while starting' });
        }
    }

    static async stopTeste(req, res) {
        try {
            statusTeste = false;
            if (timerTeste) {
                clearTimeout(timerTeste);
                timerTeste = null;
            }
            return res.status(200).send({ statusTeste });
        } catch (error) {
            return res.status(404).send({ error: 'Error while stopping' });
        }
    }
}

module.exports = TestController;

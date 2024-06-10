require("dotenv").config();
const { Status } = require("../models/status");
const { Values } = require("../models/values");
const { Time } = require("../models/time");
const { Process } = require("../models/process");


// let status = false;
// let timer = null;

// let values = [100, 200, 500, 700, 1000];

class ChallengeController {
    static async getStatus(req, res) {
        try {
            const statusDoc = await Status.findOne();
            if (!statusDoc) {
                return res.status(404).send({ error: 'Status not found' });
            }
            return res.status(200).send({ status: statusDoc.status, finished: statusDoc.finished });
        } catch (error) {
            return res.status(500).send({ error: 'Error while getting status' });
        }
    }

    static async start(req, res) {
        try {
            let statusDoc = await Status.findOne();
            if (!statusDoc) {
                statusDoc = new Status({ status: true, finished: false });
                await statusDoc.save();
            } else {
                statusDoc.status = true;
                statusDoc.finished = false;
                await statusDoc.save();
            }
            return res.status(200).send({ status: statusDoc.status, finished: statusDoc.finished });
        } catch (error) {
            return res.status(500).send({ error: 'Error while starting' });
        }
    }

    static async stop(req, res) {
        try {
            let statusDoc = await Status.findOne();
            if (!statusDoc) {
                statusDoc = new Status({ status: false, finished: false });
                await statusDoc.save();
            } else {
                statusDoc.status = false;
                statusDoc.finished = false;
                await statusDoc.save();
            }
            return res.status(200).send({ status: statusDoc.status, finished: statusDoc.finished });
        } catch (error) {
            return res.status(500).send({ error: 'Error while stopping' });
        }
    }

    static async finish(req, res) {
        try {
            let statusDoc = await Status.findOne();
            if (!statusDoc) {
                statusDoc = new Status({ status: false, finished: true });
                await statusDoc.save();
            } else {
                statusDoc.status = false;
                statusDoc.finished = true;
                await statusDoc.save();
            }
            return res.status(200).send({ status: statusDoc.status, finished: statusDoc.finished });
        } catch (error) {
            return res.status(500).send({ error: 'Error while stopping' });
        }
    }

    static async postValues(req, res) {
        const { newValues } = req.body;

        if (!newValues || !Array.isArray(newValues) || newValues.length !== 5)
            return res.status(400).send({ message: 'Invalid or missing values' });

        try {
            const valuesDoc = await Values.findOne();
            if (!valuesDoc) {
                const newValuesDoc = new Values({ values: newValues });
                await newValuesDoc.save();
            } else {
                valuesDoc.values = newValues;
                await valuesDoc.save();
            }
            res.status(201).send({ message: 'Values registered successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Something failed while registering values' });
        }
    }

    static async getValues(req, res) {
        try {
            const valuesDoc = await Values.findOne();
            if (!valuesDoc) {
                return res.status(404).send({ error: 'Values not found' });
            }
            return res.status(200).send({ values: valuesDoc.values });
        } catch (error) {
            return res.status(500).send({ error: 'Error while getting values' });
        }
    }

    static async getTime(req, res) {
        try {
            const timeDoc = await Time.findOne();
            if (!timeDoc) {
                return res.status(404).send({ error: 'Time not found' });
            }
            return res.status(200).send({ hora: timeDoc.hora, minuto: timeDoc.minuto });
        } catch (error) {
            return res.status(500).send({ error: 'Error while getting time' });
        }
    }

    static async postTime(req, res) {
        const { hora, minuto } = req.body;

        try {
            let timeDoc = await Time.findOne();
            if (!timeDoc) {
                timeDoc = new Time({ hora: hora, minuto: minuto });
                await timeDoc.save();
            } else {
                timeDoc.hora = hora;
                timeDoc.minuto = minuto;
                await timeDoc.save();
            }
            return res.status(200).send({ hora: timeDoc.hora, minuto: timeDoc.minuto });
        } catch (error) {
            return res.status(500).send({ error: 'Error while setting time' });
        }
    }

    static async postProcess(req, res) {
        const { turma, data, periodo } = req.body;

        if (!turma || !data || !periodo)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        const activeProcess = await Process.findOne({ status: 'ativo' });

        if(activeProcess) {
            const updatedProcess = await Process.findOneAndUpdate(
                { status: 'ativo' },
                { $set: { status: 'finalizado' } },
                { new: true }
            );
        }

        const process = new Process({
            turma,
            data,
            periodo,
            status: "ativo"
        });

        try {
            await process.save();
            res.status(201).send({ message: 'Process registered successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a process' });
        }
    }

    static async finishProcess(req, res) {
        try {
            const process = await Process.findOneAndUpdate(
                { status: 'ativo' },
                { $set: { status: 'finalizado' } },
                { new: true }
            );

            if (!process) {
                return res.status(404).send({ error: 'Process not found' });
            }

            return res.status(200).send(process);
        } catch (error) {
            console.error("Error in FinishProcess:", error);
            return res.status(500).send({ error: 'Internal server error' });
        }
    }

    static async getActiveProcess(req, res) {
        try {
            const process = await Process.findOne({ status: 'ativo' });

            if (!process) {
                return res.status(404).send({ error: 'Process not found' });
            }

            return res.status(200).send(process);
        } catch (error) {
            console.error("Error in GetActiveProcess:", error);
            return res.status(500).send({ error: 'Internal server error' });
        }
    }

}

module.exports = ChallengeController;

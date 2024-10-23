const catchError = require('../utils/catchError');
const Video = require('../models/Video');

const getAll = catchError(async (req, res) => {
    const results = await Video.findAll();
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const result = await Video.create(req.body);
    return res.status(201).json(result);
});

const videoToDB = async (videoData) => {
    try {
        const existingVideo = await Video.findOne({ where: { path: videoData.path } });
        if (existingVideo) {
            console.log(`El video ya existe en la base de datos: ${videoData.title}`);
            return existingVideo;
        } else {
            const video = await Video.create({
                title: videoData.title,
                path: videoData.path,
                size: videoData.size,
            });
            return video;
        }

    } catch (error) {
        throw error;
    }
};

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Video.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Video.destroy({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Video.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    videoToDB,
    getOne,
    remove,
    update
}
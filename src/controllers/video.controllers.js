const catchError = require('../utils/catchError');
const Video = require('../models/Video');

const getAll = catchError(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Video.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
    });

    return res.json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        videos: rows
    });
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
                category: videoData.category
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